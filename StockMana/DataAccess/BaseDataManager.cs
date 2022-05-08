using Microsoft.Practices.EnterpriseLibrary.Data.Sql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Linq;

namespace MyWebProject.DataAccess
{
    public class BaseDataManager
    {
        public string ConnectionString
        {
            get
            {
                return ConfigurationManager.ConnectionStrings["DefaultConnectionstring"].ConnectionString;
            }
        }

        public int ExecuteNonQuerySP(string spName, params object[] parameters)
        {
            SqlDatabase db = CreateDatabase();
            int rowsAffected = 0;
            using (var cmd = CreateCommandFromSP(db, spName))
            {
                db.AssignParameters(cmd, parameters.ToArray());
                rowsAffected = db.ExecuteNonQuery(cmd);
            }
            return rowsAffected;
        }

        public T ExecuteReaderItemSP<T>(string spName, Func<IDataReader, T> mapper, params object[] parameters) where T : class
        {
            T result = null;
            var db = CreateDatabase();
            using (var cmd = CreateCommandFromSP(db, spName))
            {
                db.AssignParameters(cmd, parameters.ToArray());
                using (IDataReader reader = db.ExecuteReader(cmd))
                {
                    if (reader.Read())
                    {
                        result = mapper(reader);
                        cmd.Cancel();
                        reader.Close();
                    }
                }
            }
            return result;
        }

        public List<T> ExecuteReaderListSP<T>(string spName, Func<IDataReader, T> mapper, params object[] parameters) where T : class
        {
            List<T> result = new List<T>();
            ExecuteReaderSP(spName, (reader) =>
            {
                while (reader.Read())
                {
                    T obj = mapper(reader);
                    if (obj != null)
                        result.Add(obj);
                }
            },
                parameters);
            return result;
        }

        public List<T> ExecuteReaderListSP<T, Q>(string spName, Action<IDataReader, Q> mapper, Func<Q, List<T>> convertResultToList, params object[] parameters) where T : class where Q : class
        {
            Q result = null;
            ExecuteReaderSP(spName, (reader) =>
            {
                if (reader != null)
                {
                    result = (Q)Activator.CreateInstance(typeof(Q));
                    while (reader.Read())
                    {
                        mapper(reader, result);
                    }
                }
            },
                parameters);
            return result != null ? convertResultToList(result) : null;
        }

        void ExecuteReaderSP(string spName, Action<IDataReader> onReaderReady, params object[] parameters)
        {
            var db = CreateDatabase();
            using (var cmd = CreateCommandFromSP(db, spName))
            {
                db.AssignParameters(cmd, parameters.ToArray());
                using (IDataReader reader = db.ExecuteReader(cmd))
                {
                    onReaderReady(reader);
                    cmd.Cancel();
                    reader.Close();
                }
            }
        }

        private SqlDatabase CreateDatabase()
        {
            SqlDatabase db = new SqlDatabase(ConnectionString);
            return db;
        }

        private DbCommand CreateCommand(SqlDatabase db, string sql, int? commandTimeoutInSeconds = null)
        {
            var cmd = db.GetSqlStringCommand(sql);
            return cmd;
        }

        private DbCommand CreateCommandFromSP(SqlDatabase db, string spName)
        {
            var cmd = db.GetStoredProcCommand(spName);
            return cmd;
        }
    }
}
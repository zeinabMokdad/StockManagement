
CREATE PROCEDURE [dbo].[sp_Currency_Update]
@Id bigint,
@Name nvarchar(255),
@Symbol nvarchar(50)
AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM [Currency] WHERE Symbol = @Symbol and Id <> @Id)
	BEGIN
		Update [Currency] set [Name] = @Name,
		Symbol = @Symbol
		WHERE Id = @Id
	END
END
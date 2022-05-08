CREATE PROCEDURE [dbo].[sp_Customer_GetById]
@Id bigint
AS
BEGIN
	SELECT [Id], [FirstName], LastName, PhoneNumber
	FROM [Customer]
	WHERE Id = @Id
END
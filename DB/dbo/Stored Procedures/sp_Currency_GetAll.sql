CREATE PROCEDURE [dbo].[sp_Currency_GetAll]
@Name nvarchar(255) = null
AS
BEGIN
	SELECT [Id],[Symbol],[Name]
	FROM [Currency]
	WHERE (@Name is null or [Name] like @Name+'%')
END
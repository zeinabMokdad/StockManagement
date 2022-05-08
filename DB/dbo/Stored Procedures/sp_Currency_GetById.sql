CREATE PROCEDURE [dbo].[sp_Currency_GetById]
@Id int
AS
BEGIN
	SELECT [Id],[Symbol],[Name]
	FROM [Currency]
	WHERE Id = @Id
END
CREATE PROCEDURE [dbo].[sp_Product_GetAll]
@Barcode varchar(255) = null,
@Name varchar (255) = null
AS
BEGIN
	SELECT [Id], [Name], Barcode, Quantity, Price, CurrencyId
	FROM [Product]
	WHERE (@Barcode is null or Barcode like @Barcode+'%')
	AND (@Name is null or [Name] like '%'+@Name+'%')
END
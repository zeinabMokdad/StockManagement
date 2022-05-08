CREATE PROCEDURE [dbo].[sp_Product_GetByBarcode]
@Barcode varchar(255)
AS
BEGIN
	SELECT [Id], [Name], Barcode, Quantity, Price, CurrencyId
	FROM [Product]
	WHERE Barcode = @Barcode
END
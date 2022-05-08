CREATE PROCEDURE [dbo].[sp_Product_Add]
@Name nvarchar(255),
@Barcode nvarchar(255),
@Price  decimal(20,4),
@Quantity int,
@CurrencyId int

AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM [Product] WHERE Barcode = @Barcode)
	BEGIN
		INSERT INTO [Product] ([Name], Barcode, Price, Quantity, CurrencyId )
		VALUES (@Name, @Barcode, @Price, @Quantity, @CurrencyId)
	END
END
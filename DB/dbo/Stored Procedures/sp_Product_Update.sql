CREATE PROCEDURE [dbo].[sp_Product_Update]
@Id bigint,
@Name nvarchar(255),
@Barcode nvarchar(255),
@Price  decimal(20,4),
@Quantity int,
@CurrencyId int

AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM [Product] WHERE Barcode = @Barcode and Id <> @Id)
	BEGIN
		Update [Product] set [Name] = @Name,
		Quantity = @Quantity,
		Price = @Price,
		Barcode = @Barcode,
		CurrencyId = @CurrencyId
		WHERE Id = @Id
	END
END
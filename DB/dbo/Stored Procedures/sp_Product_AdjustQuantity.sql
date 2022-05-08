CREATE PROCEDURE [dbo].[sp_Product_AdjustQuantity]
@Id bigint,
@Quantity int

AS
BEGIN
	UPDATE [Product] set Quantity = Quantity + @Quantity
	WHERE Id = @Id
END
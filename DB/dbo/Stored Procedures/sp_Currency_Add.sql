
CREATE PROCEDURE [dbo].[sp_Currency_Add]
@Name nvarchar(255),
@Symbol nvarchar(50)

AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM [Currency] WHERE Symbol = @Symbol)
	BEGIN
		INSERT INTO [Currency] ([Name], Symbol)
		VALUES (@Name, @Symbol)
	END
END
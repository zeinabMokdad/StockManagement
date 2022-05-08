
CREATE PROCEDURE [dbo].[sp_Customer_Add]
@FirstName varchar(255),
@LastName varchar(255),
@PhoneNumber varchar(50)

AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM [Customer] WHERE PhoneNumber = @PhoneNumber)
	BEGIN
		INSERT INTO [Customer] (FirstName, LastName, PhoneNumber )
		VALUES (@FirstName, @LastName, @PhoneNumber)
	END
END
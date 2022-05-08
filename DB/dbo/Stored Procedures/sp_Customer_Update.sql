CREATE PROCEDURE [dbo].[sp_Customer_Update]
@Id bigint,
@FirstName varchar(255),
@LastName varchar(255),
@PhoneNumber varchar(50)

AS
BEGIN
	IF NOT EXISTS(SELECT 1 FROM [Customer] WHERE PhoneNumber = @PhoneNumber and Id <> @Id)
	BEGIN
		Update [Customer] set FirstName = @FirstName,
		LastName = @LastName,
		PhoneNumber = @PhoneNumber
		WHERE Id = @Id
	END
END
CREATE PROCEDURE [dbo].[sp_Customer_GetByPhoneNumber]
@PhoneNumber varchar(50)

AS
BEGIN
	SELECT [Id], [FirstName], LastName, PhoneNumber
	FROM [Customer]
	WHERE PhoneNumber = @PhoneNumber
END
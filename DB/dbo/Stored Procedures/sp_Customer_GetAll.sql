CREATE PROCEDURE [dbo].[sp_Customer_GetAll]
@CustomerName varchar(255) = null,
@PhoneNumber varchar (255) = null
AS
BEGIN
	SELECT [Id], [FirstName], LastName, PhoneNumber
	FROM [Customer]
	WHERE (@CustomerName is null or FirstName like @CustomerName+'%' or LastName like @CustomerName+'%')
	AND (@PhoneNumber is null or PhoneNumber like @PhoneNumber+'%')
END
CREATE TABLE [dbo].[Customer] (
    [Id]          BIGINT        IDENTITY (1, 1) NOT NULL,
    [FirstName]   VARCHAR (255) NOT NULL,
    [LastName]    VARCHAR (255) NOT NULL,
    [PhoneNumber] VARCHAR (50)  NOT NULL,
    CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED ([Id] ASC)
);


USE [master]
GO
/****** Object:  Database [SadnaProject]    Script Date: 11/24/2019 12:09:21 AM ******/
CREATE DATABASE [SadnaProject]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SadnaProject', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\SadnaProject.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SadnaProject_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\SadnaProject_log.ldf' , SIZE = 204800KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [SadnaProject] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SadnaProject].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SadnaProject] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SadnaProject] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SadnaProject] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SadnaProject] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SadnaProject] SET ARITHABORT OFF 
GO
ALTER DATABASE [SadnaProject] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SadnaProject] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SadnaProject] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SadnaProject] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SadnaProject] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SadnaProject] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SadnaProject] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SadnaProject] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SadnaProject] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SadnaProject] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SadnaProject] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SadnaProject] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SadnaProject] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SadnaProject] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SadnaProject] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SadnaProject] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SadnaProject] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SadnaProject] SET RECOVERY FULL 
GO
ALTER DATABASE [SadnaProject] SET  MULTI_USER 
GO
ALTER DATABASE [SadnaProject] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SadnaProject] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SadnaProject] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SadnaProject] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SadnaProject] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'SadnaProject', N'ON'
GO
ALTER DATABASE [SadnaProject] SET QUERY_STORE = OFF
GO
USE [SadnaProject]
GO
/****** Object:  User [nodejs]    Script Date: 11/24/2019 12:09:21 AM ******/
CREATE USER [nodejs] FOR LOGIN [nodejs] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [nodejs]
GO
/****** Object:  UserDefinedFunction [dbo].[GetNextPhraseInText_f]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
Create FUNCTION  [dbo].[GetNextPhraseInText_f]
(
	@text NVARCHAR(max)
)
RETURNS NVARCHAR(250)
AS
BEGIN
	DECLARE @str NVARCHAR(max);
	DECLARE @result NVARCHAR(max);

	IF (@text IS NULL)
	BEGIN
		SET @result = NULL;
	END
	ELSE
	BEGIN
	    SET @str = RTRIM(LTRIM(@text));
		SET @result = SUBSTRING (@str ,0 ,CHARINDEX (' ', @str));
		IF (CHARINDEX (' ', @str) = 0)
		BEGIN
			SET @result = @str;
		END
	END

	RETURN @result;
END
GO
/****** Object:  UserDefinedFunction [dbo].[GetTextByIndexs_f]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION  [dbo].[GetTextByIndexs_f]
(
	@textid INT,
	@currenttext NVARCHAR(max),
	@startindex INT,
	@endindex INT
)
RETURNS NVARCHAR(max)
AS
BEGIN
	DECLARE @str NVARCHAR(max);

	SELECT @str = @currenttext + ' ' + [phrase]
	FROM dbo.phrase_tbl
	WHERE [textId]= @textid AND [wordNumberInText] = @startindex
		AND [isDefinedByUser] = 0;

	IF (@startindex < @endindex)
	BEGIN
		SET @str = [dbo].[GetTextByIndexs_f](@textid, @str, @startindex + 1, @endindex);
	END

	RETURN @str;
END
GO
/****** Object:  UserDefinedFunction [dbo].[GetTextByIndexsNonRecurcive_f]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION  [dbo].[GetTextByIndexsNonRecurcive_f]
(
	@textid INT,
	@startindex INT,
	@endindex INT
)
RETURNS NVARCHAR(max)
AS
BEGIN
	DECLARE @str NVARCHAR(max) = '';
	DECLARE @phrase NVARCHAR(250);
	DECLARE @i INT = @startindex;
	--DECLARE @crrrentRow INT = 1;
	--DECLARE @phraseRow INT;

	WHILE (@i <= @endindex)
	BEGIN
		SELECT @phrase = phrase --, @phraseRow = rowInText
		FROM [dbo].[phrase_tbl] 
		WHERE textId = @textid
			AND wordNumberInText = @i;
		SELECT @str = @str + ' ' + @phrase
		SET @i += 1;
		/*
		IF(@phraseRow > @crrrentRow)
		BEGIN
			SELECT @str = @str + CHAR(13) + CHAR(10);
			SET @crrrentRow = @phraseRow;
        END
		*/
	END
    
	RETURN RTRIM(LTRIM(@str));
END
GO
/****** Object:  UserDefinedFunction [dbo].[GetWordCount_f]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[GetWordCount_f]
(
	@str NVARCHAR(max)
)
RETURNS INT 
AS
BEGIN
	DECLARE @result INT;
	SELECT @result = COUNT(*) FROM STRING_SPLIT(@str,' ');
	RETURN @result;
END
GO
/****** Object:  UserDefinedFunction [dbo].[STRING_SPLIT]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[STRING_SPLIT]
(
	@SourceString NVARCHAR(MAX),
	@Seperator NVARCHAR(25) =','
)
RETURNS @ResultTable
TABLE(
[Position] INT IDENTITY(1,1),
[Value] VARCHAR(MAX)
)
AS

BEGIN
	DECLARE @w_xml xml;

	SET @w_xml = N'<root><i>' + replace(@SourceString, @Seperator,'</i><i>') + '</i></root>';

	INSERT INTO @ResultTable([Value])
	SELECT [i].value('.', 'VARCHAR(MAX)') AS Value
	FROM @w_xml.nodes('//root/i') AS [Items]([i]);
	RETURN;
END;

GO
/****** Object:  Table [dbo].[phrase_tbl]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[phrase_tbl](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[phrase] [nvarchar](250) NOT NULL,
	[locationFromStart] [int] NOT NULL,
	[rowInText] [int] NOT NULL,
	[locationInRow] [int] NOT NULL,
	[textId] [int] NOT NULL,
	[wordNumberInText] [int] NOT NULL,
	[isDefinedByUser] [bit] NOT NULL,
 CONSTRAINT [PK_phrase_tbl] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[text_info_tbl]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[text_info_tbl](
	[text_id] [int] NOT NULL,
	[attributeKey] [nvarchar](50) NOT NULL,
	[attributeValue] [nvarchar](250) NOT NULL,
 CONSTRAINT [IX_uq_text_info_tbl] UNIQUE NONCLUSTERED 
(
	[text_id] ASC,
	[attributeKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[text_tbl]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[text_tbl](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](250) NOT NULL,
	[totalWords] [int] NOT NULL,
	[totalRows] [int] NOT NULL,
	[totalCharacters] [int] NOT NULL,
 CONSTRAINT [PK_text_tbl] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[userDefinedGroup_tbl]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[userDefinedGroup_tbl](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_userDefinedGroup] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[userDefinedGroupWords_tbl]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[userDefinedGroupWords_tbl](
	[groupId] [int] NOT NULL,
	[phrase] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_userDefinedGroupWords_tbl] PRIMARY KEY CLUSTERED 
(
	[groupId] ASC,
	[phrase] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[userDefinedPhrase_tbl]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[userDefinedPhrase_tbl](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[phrase] [nvarchar](250) NOT NULL,
 CONSTRAINT [PK_userDefinedPhrase] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_phrase_phrase_tbl]    Script Date: 11/24/2019 12:09:21 AM ******/
CREATE NONCLUSTERED INDEX [IX_phrase_phrase_tbl] ON [dbo].[phrase_tbl]
(
	[phrase] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_phrase_row_loction_tbl]    Script Date: 11/24/2019 12:09:21 AM ******/
CREATE NONCLUSTERED INDEX [IX_phrase_row_loction_tbl] ON [dbo].[phrase_tbl]
(
	[textId] ASC,
	[rowInText] ASC,
	[locationInRow] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_phrase_wordintext_tbl]    Script Date: 11/24/2019 12:09:21 AM ******/
CREATE NONCLUSTERED INDEX [IX_phrase_wordintext_tbl] ON [dbo].[phrase_tbl]
(
	[textId] ASC,
	[wordNumberInText] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[phrase_tbl]  WITH CHECK ADD  CONSTRAINT [FK_phrase_tbl_text_tbl] FOREIGN KEY([textId])
REFERENCES [dbo].[text_tbl] ([id])
GO
ALTER TABLE [dbo].[phrase_tbl] CHECK CONSTRAINT [FK_phrase_tbl_text_tbl]
GO
ALTER TABLE [dbo].[text_info_tbl]  WITH CHECK ADD  CONSTRAINT [FK_text_info_tbl_text_tbl] FOREIGN KEY([text_id])
REFERENCES [dbo].[text_tbl] ([id])
GO
ALTER TABLE [dbo].[text_info_tbl] CHECK CONSTRAINT [FK_text_info_tbl_text_tbl]
GO
ALTER TABLE [dbo].[userDefinedGroupWords_tbl]  WITH CHECK ADD  CONSTRAINT [FK_userDefinedGroupWords_userDefinedGroup] FOREIGN KEY([groupId])
REFERENCES [dbo].[userDefinedGroup_tbl] ([id])
GO
ALTER TABLE [dbo].[userDefinedGroupWords_tbl] CHECK CONSTRAINT [FK_userDefinedGroupWords_userDefinedGroup]
GO
/****** Object:  StoredProcedure [dbo].[AddNewText_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[AddNewText_sp]
	@text NVARCHAR(max),
	@title NVARCHAR(250)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @newtextid INT = null;
	DECLARE @runningtext NVARCHAR(max) = RTRIM(LTRIM(@text));
	-- adgustment to new line character (probably needs to be debuged)
	SET @runningtext = REPLACE(@runningtext,CHAR(13),' #$#');
	SET @runningtext = REPLACE(@runningtext,CHAR(10),'');
	DECLARE @currentrowscounter INT = 1;
	DECLARE @currentwordscounter INT = 0;
	DECLARE @curerentcharacterscounter INT = 0;
	DECLARE @currentwordinrow INT = 0;
	DECLARE @str NVARCHAR(250);

	CREATE TABLE #temp_phrase_tbl([phrase] NVARCHAR(250), [locationFromStart] INT, [rowInText] INT, [locationInRow] INT, [wordNumberInText] INT)

	WHILE(@runningtext != '')
	BEGIN
		-- handle move row if needed
		--PRINT @currentwordscounter;
		WHILE (SUBSTRING(@runningtext, 1, 3) = '#$#')
		BEGIN
			SET @runningtext = RIGHT(@runningtext,LEN(@runningtext) - LEN('#$#'));
			SET @runningtext = RTRIM(LTRIM(@runningtext));
			SET @currentrowscounter = @currentrowscounter +1;
			SET @currentwordinrow = 0
		END
		-- handle next word
		SET @str = [dbo].[GetNextPhraseInText_f](@runningtext);
		SET @currentwordinrow = (@currentwordinrow + 1);
		SET @currentwordscounter = (@currentwordscounter + 1);
		
		--PRINT '@str :' + @str + ' num:' + CAST(@currentwordscounter AS NVARCHAR) + 'SUBSTRING(@runningtext, 1, 3):'+
		--SUBSTRING(@runningtext, 1, 3);
		INSERT INTO #temp_phrase_tbl([phrase], [locationFromStart], [rowInText], [locationInRow], [wordNumberInText])
		VALUES(@str, @curerentcharacterscounter, @currentrowscounter, @currentwordinrow, @currentwordscounter)

		SET @curerentcharacterscounter = (@curerentcharacterscounter + LEN(@str));

		--PRINT ' LEN(@runningtext):' + CAST(LEN(@runningtext) AS NVARCHAR) + '  '+ ' LEN(@str):' + CAST(LEN(@str) AS NVARCHAR);
		-- prepering the running text for next pass
		SET @runningtext = RTRIM(LTRIM(@runningtext));
		SET @runningtext = RIGHT(@runningtext,LEN(@runningtext) - LEN(@str));
		SET @runningtext = RTRIM(LTRIM(@runningtext));
		--PRINT 'running text :' + @runningtext;

	END
	--PRINT 'END OF LOOP';
	-- insert text meta data
	INSERT INTO [dbo].[text_tbl]([title],[totalWords],[totalRows],[totalCharacters])
    VALUES(@title, @currentwordscounter,@currentrowscounter,@curerentcharacterscounter);

	SELECT @newtextid = SCOPE_IDENTITY();

	-- insert text analayzed phrases
	INSERT INTO [dbo].[phrase_tbl]([phrase], [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText], [isDefinedByUser])
	SELECT [phrase], [locationFromStart], [rowInText], [locationInRow], @newtextid, [wordNumberInText], 0
	FROM #temp_phrase_tbl;

	--handle user defined prases
	INSERT INTO  [dbo].[phrase_tbl]([phrase], [locationFromStart], [rowInText], [locationInRow],[textId], [wordNumberInText], [isDefinedByUser])
	SELECT udp.phrase, p.[locationFromStart], p.[rowInText], p.[locationInRow], @newtextid, p.[wordNumberInText], 1
	FROM [dbo].[userDefinedPhrase_tbl] udp
	INNER JOIN [dbo].[phrase_tbl] p ON p.phrase = udp.phrase AND p.[textId] = @newtextid
	WHERE [dbo].[GetTextByIndexsNonRecurcive_f](@newtextid, p.wordNumberInText, p.wordNumberInText + (SELECT COUNT(*) FROM STRING_SPLIT(udp.phrase,' '))) = udp.phrase 

	-- cleanup
	DROP TABLE #temp_phrase_tbl;

	--return new text id
	SELECT @newtextid;
END
GO
/****** Object:  StoredProcedure [dbo].[AddPhraseListToUserDefinedGroup_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AddPhraseListToUserDefinedGroup_sp]
	@phraselist NVARCHAR(max),
	@separator NCHAR,
	@groupid INT
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO [dbo].[userDefinedGroupWords_tbl]([groupId],[phrase])
	SELECT @groupid , ltrim(RTRIM([value]))
	FROM STRING_SPLIT(@phraselist, @separator)
END
GO
/****** Object:  StoredProcedure [dbo].[AddPhraseToUserDefinedGroup_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AddPhraseToUserDefinedGroup_sp]
	@Phrase NVARCHAR(250),
	@groupid int
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO [dbo].[userDefinedGroupWords_tbl]([groupId], [phrase])
	VALUES(@groupid, LTRIM(RTRIM(@Phrase)))
END
GO
/****** Object:  StoredProcedure [dbo].[AddTextMetaData_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[AddTextMetaData_sp]
	@textid			int,
	@key			NVARCHAR(50),
	@value			NVARCHAR(250)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @result INT = 0;
	INSERT INTO [dbo].[text_info_tbl]([text_id],[attributeKey],[attributeValue])
	VALUES(@textid, @key, @value);

	IF((SELECT COUNT(*) FROM [dbo].[text_info_tbl] WHERE [text_id] = @textid AND [attributeKey] = @key) > 0)
	BEGIN
		SET @result  = 1;
	END

	RETURN @result;
END
GO
/****** Object:  StoredProcedure [dbo].[AddUserDefinedPhrase_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[AddUserDefinedPhrase_sp]
	@newphrase NVARCHAR(250)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @str NVARCHAR(250) = LTRIM(RTRIM(@newphrase));
	DECLARE @wordsNum INT;
	SELECT @wordsNum = COUNT(*) FROM STRING_SPLIT(@str,' ');
	DECLARE @firstWord NVARCHAR(250) = substring(@str, 1, CHARINDEX(' ', @str));

	IF (NOT EXISTS(SELECT * FROM [dbo].[phrase_tbl] WHERE [phrase] = @newphrase))
	BEGIN
		INSERT INTO [dbo].[userDefinedPhrase_tbl] ([phrase])
		VALUES(@str);

		INSERT INTO [dbo].[phrase_tbl] ([phrase], [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText], [isDefinedByUser])
		SELECT @str, [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText], 1
		FROM [dbo].[phrase_tbl]
		WHERE isDefinedByUser = 0
			AND @firstWord = phrase
			AND LTRIM(RTRIM([dbo].[GetTextByIndexsNonRecurcive_f]([textId], [wordNumberInText], [wordNumberInText] + @wordsNum - 1))) = @str
    END
END
GO
/****** Object:  StoredProcedure [dbo].[CreateUserDefinedWordsGroup_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[CreateUserDefinedWordsGroup_sp]
	@groupName NVARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO [dbo].[userDefinedGroup_tbl]([name])
	VALUES(LTRIM(RTRIM(@groupName)))

	SELECT SCOPE_IDENTITY() AS [newGroupId]

END
GO
/****** Object:  StoredProcedure [dbo].[DeleteText_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[DeleteText_sp]
	@textId INT
AS
BEGIN
	SET NOCOUNT ON;

	DELETE FROM dbo.phrase_tbl
	WHERE textId = @textId;

	DELETE FROM [dbo].[text_info_tbl]
	WHERE text_id = @textId;

	DELETE FROM dbo.text_tbl
	WHERE id = @textId;
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteUserDefinedPhrase_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[DeleteUserDefinedPhrase_sp]
	@UserDefinedPhraseId INT
AS
BEGIN
	SET NOCOUNT ON;

	DELETE FROM dbo.phrase_tbl
	WHERE phrase = (SELECT phrase FROM [dbo].[userDefinedPhrase_tbl] WHERE id = @UserDefinedPhraseId);

	DELETE FROM [dbo].[userDefinedPhrase_tbl]
	WHERE id = @UserDefinedPhraseId;

END
GO
/****** Object:  StoredProcedure [dbo].[DeleteUserDefinedWordFromGroup_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[DeleteUserDefinedWordFromGroup_sp]
	@phrase NVARCHAR(250),
	@groupid INT
AS
BEGIN
	SET NOCOUNT ON;
	DELETE FROM [dbo].[userDefinedGroupWords_tbl]
	WHERE [groupId] = @groupid AND [phrase] = @phrase;

END
GO
/****** Object:  StoredProcedure [dbo].[DeleteUserDefinedWordsGroup_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[DeleteUserDefinedWordsGroup_sp]
	@groupid INT
AS
BEGIN
	SET NOCOUNT ON;

	DELETE FROM [dbo].[userDefinedGroupWords_tbl]
	WHERE [groupId] = @groupid;

	DELETE FROM [dbo].[userDefinedGroup_tbl]
	WHERE [id] = @groupid;
END
GO
/****** Object:  StoredProcedure [dbo].[ExportIngestedTexts_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ExportIngestedTexts_sp]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT [title] AS [@title],
		[totalWords] AS [@totalWords],
		[totalRows] AS [@totalRows],
		[totalCharacters] AS [@totalCharacters],
		(SELECT ti.[attributeKey], 
			ti.[attributeValue]
		 FROM [dbo].[text_info_tbl] ti
		 WHERE ti.text_id = t.[id]
		 FOR XML PATH('row'), ROOT('info'), TYPE),
		 (SELECT [phrase], 
			[locationFromStart], 
			[rowInText], 
			[locationInRow],
			[wordNumberInText]
		 FROM [dbo].[phrase_tbl] p
		 WHERE p.textId = t.[id] 
			AND p.isDefinedByUser = 0
		 FOR XML PATH('row'), ROOT('phrases'), TYPE)
	FROM [dbo].[text_tbl] t
	FOR XML PATH('text'), ROOT('texts');

END
GO
/****** Object:  StoredProcedure [dbo].[ExportUserDefinedGroups_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ExportUserDefinedGroups_sp]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT g.[name] AS [@name],
		(SELECT gw.[phrase]
		 FROM [dbo].[userDefinedGroupWords_tbl] gw
		 WHERE gw.[groupId] = g.[id]
		 FOR XML PATH('row'), ROOT('phrases'), TYPE)
	FROM [dbo].[userDefinedGroup_tbl] g  
	FOR XML PATH('group'), ROOT('groups');
END
GO
/****** Object:  StoredProcedure [dbo].[ExportUserDefinedPhrases_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ExportUserDefinedPhrases_sp]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT [phrase] FROM [dbo].[userDefinedPhrase_tbl] FOR XML PATH('data'), ROOT;
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllPhrasesInAText_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetAllPhrasesInAText_sp]
	@textid INT 
AS
BEGIN
	SET NOCOUNT ON;
	IF (@textId = -1)
		BEGIN
			SELECT [id] ,[phrase] ,[locationFromStart] ,[rowInText],[locationInRow] ,[textId] ,[wordNumberInText]
			FROM [dbo].[phrase_tbl]
			ORDER BY [textId],[wordNumberInText]
		END
	ELSE
		BEGIN
			SELECT [id] ,[phrase] ,[locationFromStart] ,[rowInText],[locationInRow] ,[textId] ,[wordNumberInText]
			FROM [dbo].[phrase_tbl]
			WHERE textId = @textid 
			ORDER BY [textId],[wordNumberInText]
		END
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllTexts_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetAllTexts_sp]
AS
BEGIN
	SELECT *
	FROM text_tbl
	ORDER BY id DESC
END
GO
/****** Object:  StoredProcedure [dbo].[GetContextForPhrase_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetContextForPhrase_sp]
	@phraseid INT,
	@wordsforward INT,
	@wordsbackward INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @index INT;
	DECLARE @startindex INT;
	DECLARE @endindex INT;
	DECLARE @textid INT;

	SELECT @textid = [textId], @index = [wordNumberInText]
	FROM dbo.phrase_tbl
	WHERE id = @phraseid;

	SELECT @startindex = MIN([wordNumberInText]) ,@endindex = MAX([wordNumberInText])
	FROM dbo.phrase_tbl
	WHERE [textId] = @textid
	AND [wordNumberInText] < (@index + @wordsforward + 1)
	AND [wordNumberInText] > (@index - @wordsbackward - 1)

	PRINT '@startindex:'+ CAST(@startindex AS NVARCHAR) + ' @endindex:'+ CAST(@endindex AS NVARCHAR)
	SELECT [dbo].[GetTextByIndexsNonRecurcive_f](@textid, @startindex, @endindex);
END
GO
/****** Object:  StoredProcedure [dbo].[GetContextForPhraseAllAppearance_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetContextForPhraseAllAppearance_sp]
	@phrase NVARCHAR(50),
	@wordsforward INT,
	@wordsbackward INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT a.id AS Phraseid, [dbo].[GetTextByIndexsNonRecurcive_f](a.[textId], startindex, endindex) AS Context
	FROM (
		SELECT [id], 
			[textId], 
			CASE
			WHEN ([wordNumberInText] - @wordsbackward) < 1 THEN 1
			ELSE ([wordNumberInText] - @wordsbackward)
			END AS startindex,
			CASE
			WHEN ([wordNumberInText] + @wordsforward) > (SELECT MAX([wordNumberInText]) FROM dbo.phrase_tbl p1 WHERE p1.textId = p.textId) THEN (SELECT MAX([wordNumberInText]) FROM dbo.phrase_tbl p1 WHERE p1.textId = p.textId)
			ELSE ([wordNumberInText] + @wordsforward)
			END AS endindex
		FROM dbo.phrase_tbl p
		WHERE [phrase] = @phrase
	) a
END
GO
/****** Object:  StoredProcedure [dbo].[GetFrequencyList_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetFrequencyList_sp]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT [phrase], COUNT(*) AS [count]
	FROM [dbo].[phrase_tbl]
	GROUP BY [phrase]
	ORDER BY COUNT(*) desc
END
GO
/****** Object:  StoredProcedure [dbo].[GetFrequencyListForText_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetFrequencyListForText_sp]
	@textid INT 
AS
BEGIN
	SET NOCOUNT ON;
	SELECT [phrase], COUNT(*) AS [count]
	FROM [dbo].[phrase_tbl]
	WHERE [textId] = @textid
	GROUP BY [phrase]
	ORDER BY COUNT(*) desc
END
GO
/****** Object:  StoredProcedure [dbo].[GetImportPathesForXML_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetImportPathesForXML_sp]

AS
BEGIN
	SET NOCOUNT ON;

	SELECT 'D:\xmlimports\texts.xml' AS [TextsPath],
		'D:\xmlimports\wordGroups.xml' AS [WordGroupsPath],
		'D:\xmlimports\userDefinedPhrases.xml' AS [UserDefinedPhrasesPath]
END
GO
/****** Object:  StoredProcedure [dbo].[GetIndexForPhrase_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetIndexForPhrase_sp]
	@phrase nvarchar(250),
	@textid INT = null
AS
BEGIN
	SET NOCOUNT ON;
	IF (@textid IS null)
	BEGIN
		SELECT [id], [phrase], [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText]
		FROM [dbo].[phrase_tbl]
		WHERE [phrase] = @phrase;
    END
	ELSE
	BEGIN
		SELECT [id], [phrase], [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText]
		FROM [dbo].[phrase_tbl]
		WHERE [phrase] = @phrase
			AND textId = @textid;
    END
END
GO
/****** Object:  StoredProcedure [dbo].[GetPhraseByID_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetPhraseByID_sp]
	@phraseId INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT [id], [phrase], [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText]
	FROM [dbo].[phrase_tbl]
	WHERE id = @phraseId
END
GO
/****** Object:  StoredProcedure [dbo].[GetPhraseByRowLocation_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetPhraseByRowLocation_sp]
	@rownum INT,
	@wordinrow INT,
	@textid INT 
AS
BEGIN
	SET NOCOUNT ON;
	
	SELECT [id] ,[phrase] ,[locationFromStart] ,[rowInText],[locationInRow] ,[textId] ,[wordNumberInText]
    FROM [dbo].[phrase_tbl]
	WHERE textId = @textid 
		AND rowInText = @rownum
		AND locationInRow = @wordinrow
END
GO
/****** Object:  StoredProcedure [dbo].[GetStatsForPhrase_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetStatsForPhrase_sp]
	@phrase NVARCHAR(250) 
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @totalAppearances INT = 0;
	DECLARE @uniqueTexts INT = 0;
	
	SELECT @totalAppearances = COUNT(*)
	FROM [dbo].[phrase_tbl]
	WHERE [phrase] = @phrase 

	SELECT @uniqueTexts = COUNT(*)
	FROM (
		SELECT [textId]
		FROM [dbo].[phrase_tbl]
		WHERE [phrase] = @phrase 
		GROUP BY [textId]) a

	SELECT @totalAppearances AS [totalAppearances], @uniqueTexts AS [uniqueTexts]
END
GO
/****** Object:  StoredProcedure [dbo].[GetStatsForRow_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetStatsForRow_sp]
	@rownum INT,
	@textid INT 
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @totalWords INT = 0;
	DECLARE @totalcharacters INT = 0;
	
	SELECT @totalWords = COUNT(*)
	FROM [dbo].[phrase_tbl]
	WHERE [textId]= @textid AND [rowInText] = @rownum
		AND [isDefinedByUser] = 0

	SELECT @totalcharacters = SUM(LEN(phrase))
	FROM [dbo].[phrase_tbl]
	WHERE rowInText = @rownum AND [textId] = @textid AND [isDefinedByUser] = 0

	SELECT @totalWords AS [totalWords], @totalcharacters AS [totalcharacters]
END
GO
/****** Object:  StoredProcedure [dbo].[GetTextByID_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetTextByID_sp]
	@textid INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT [dbo].[GetTextByIndexsNonRecurcive_f](@textid, 1, (SELECT MAX([wordNumberInText]) FROM [dbo].[phrase_tbl] p WHERE p.textId = @textid)) AS [text]
END
GO
/****** Object:  StoredProcedure [dbo].[GetTextByMetaData_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetTextByMetaData_sp]
	@attributeKey nvarchar(50),
	@attributeValue nvarchar(250)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT DISTINCT tt.id, tt.title, tt.totalWords,tt.totalRows,tt.totalCharacters
	FROM [dbo].[text_info_tbl] tit
	JOIN
	[dbo].[text_tbl] tt
	ON tit.text_id=tt.id
	WHERE [attributeKey] = @attributeKey
	AND [attributeValue] = @attributeValue
	ORDER BY tt.id DESC

END
GO
/****** Object:  StoredProcedure [dbo].[GetTextByPhrase_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetTextByPhrase_sp]
	@phrase NVARCHAR(250)
AS
BEGIN
	SELECT DISTINCT tt.id, tt.title, tt.totalWords,tt.totalRows,tt.totalCharacters
	FROM [dbo].[phrase_tbl] pt
	join 
	[dbo].[text_tbl] tt
	ON pt.textId = tt.id
	WHERE @phrase = pt.phrase
	ORDER BY tt.id DESC
END
GO
/****** Object:  StoredProcedure [dbo].[GetTextMetaDataAndStats_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetTextMetaDataAndStats_sp]
	@textid	int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT [title], [totalWords], [totalRows], [totalCharacters]
	FROM [dbo].[text_tbl]
	WHERE id = @textid;

	SELECT [attributeKey],[attributeValue]
	FROM [dbo].[text_info_tbl]
	WHERE text_id = @textid;
END
GO
/****** Object:  StoredProcedure [dbo].[GetUserDefinedGroupIndex_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetUserDefinedGroupIndex_sp]
	@groupid INT,
	@textid INT = null
AS
BEGIN
	SET NOCOUNT ON;
	IF (@textid IS null)
	BEGIN
		SELECT [id], [phrase], [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText]
		FROM [dbo].[phrase_tbl]
		WHERE [phrase] IN (SELECT [phrase] FROM [dbo].[userDefinedGroupWords_tbl]
						WHERE [groupId] = @groupid)
    END
	ELSE
	BEGIN
		SELECT [id], [phrase], [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText]
		FROM [dbo].[phrase_tbl]
		WHERE textId = @textid
			AND [phrase] IN (SELECT [phrase] FROM [dbo].[userDefinedGroupWords_tbl]
							WHERE [groupId] = @groupid);
    END
END
GO
/****** Object:  StoredProcedure [dbo].[GetUserDefinedGroupInfo_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetUserDefinedGroupInfo_sp]
	@groupid INT 
AS
BEGIN
	SET NOCOUNT ON;
	SELECT [id], [name]
	FROM [dbo].[userDefinedGroup_tbl]
	WHERE id = @groupid

	SELECT [phrase]
	FROM [dbo].[userDefinedGroupWords_tbl]
	WHERE [groupId] = @groupid
END
GO
/****** Object:  StoredProcedure [dbo].[GetUserDefinedGroupsList_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[GetUserDefinedGroupsList_sp]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT [udg].[id], [udg].[name] , 
		(SELECT COUNT([udgw].[phrase])
		 FROM [dbo].[userDefinedGroupWords_tbl] udgw 
		 WHERE udgw.groupId=udg.id)  
		 as phraseCount
	FROM [dbo].[userDefinedGroup_tbl] udg
	
END
GO
/****** Object:  StoredProcedure [dbo].[ImportIngestedTexts_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================

CREATE PROCEDURE [dbo].[ImportIngestedTexts_sp]
	@udpxml XML
AS
BEGIN

	SET NOCOUNT ON;
	--DECLARE @x xml
	--SELECT @x = P
	--FROM OPENROWSET (BULK 'C:\Examples\Products.xml', SINGLE_BLOB) AS Products(P)
	--DECLARE @udpxml XML = '<texts>
	CREATE TABLE #tmp_phraseImport([phrase] NVARCHAR(250),
	[locationFromStart] INT,
	[rowInText] INT ,
	[locationInRow] INT ,
	[textId] INT,
	[wordNumberInText] INT);

	DECLARE @hdoc INT
    
	EXEC sp_xml_preparedocument @hdoc OUTPUT, @udpxml;

	SELECT *
	INTO #tmp_xmlload
	FROM OPENXML (@hdoc, '/texts/text', 1)
	WITH (
		title NVARCHAR(250),
		totalWords INT,
		totalRows INT,
		totalCharacters INT)

	SELECT *
	INTO #tmp_xmlloadinfo
	FROM OPENXML (@hdoc, '/texts/text/info/row', 2)
	WITH (
		title NVARCHAR(250) '../../@title',
		attributeKey NVARCHAR(50),
		attributeValue NVARCHAR(250))

	SELECT *
	INTO #tmp_xmlloadrows
	FROM OPENXML (@hdoc, '/texts/text/phrases/row', 2)
	WITH (
		title NVARCHAR(250) '../../@title',
		phrase NVARCHAR(250),
        locationFromStart INT,
        rowInText INT,
        locationInRow INT,
        wordNumberInText INT)

	EXEC sp_xml_removedocument @hdoc

	DELETE FROM #tmp_xmlloadrows WHERE title IN (SELECT title FROM [dbo].[text_tbl])
	DELETE FROM #tmp_xmlload WHERE title IN (SELECT title FROM [dbo].[text_tbl])
	DELETE FROM #tmp_xmlloadinfo WHERE title IN (SELECT title FROM [dbo].[text_tbl])

	INSERT INTO [dbo].[text_tbl] (title, totalWords, totalRows, totalCharacters)
	SELECT title ,totalWords ,totalRows ,totalCharacters
	FROM #tmp_xmlload

	INSERT INTO #tmp_phraseImport([phrase],[locationFromStart], [rowInText], [locationInRow], [textId],[wordNumberInText])
	SELECT r.phrase, r.locationFromStart, r.rowInText, r.locationInRow, t.id, r.wordNumberInText
	FROM #tmp_xmlloadrows r
	INNER JOIN [dbo].[text_tbl] t ON r.title = t.title

	INSERT INTO [dbo].[text_info_tbl]([text_id], [attributeKey], [attributeValue])
	SELECT t.id , f.attributeKey, f.attributeValue 
	FROM #tmp_xmlloadinfo f
	INNER JOIN [dbo].[text_tbl] t ON f.title = t.title

	INSERT INTO [dbo].[phrase_tbl]([phrase],[locationFromStart],[rowInText],[locationInRow],[textId],[wordNumberInText]
		,[isDefinedByUser])
	SELECT [phrase],[locationFromStart], [rowInText], [locationInRow], [textId],[wordNumberInText], 0
	FROM #tmp_phraseImport

	INSERT INTO [dbo].[phrase_tbl] ([phrase], [locationFromStart], [rowInText], [locationInRow], [textId], 
		[wordNumberInText], [isDefinedByUser])
	SELECT i.phrase, [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText], 1
	FROM [dbo].[phrase_tbl] p
	inner JOIN [dbo].[userDefinedPhrase_tbl] i ON  i.phrase = 
		LTRIM(RTRIM([dbo].[GetTextByIndexs_f](p.[textId], '', p.[wordNumberInText], p.[wordNumberInText] + [dbo].[GetWordCount_f](i.phrase) - 1)))
	WHERE p.textId IN (SELECT textId FROM #tmp_phraseImport);

	DROP TABLE #tmp_phraseImport;
	DROP TABLE #tmp_xmlloadinfo;
	DROP TABLE #tmp_xmlload;
	DROP TABLE #tmp_xmlloadrows;

END
GO
/****** Object:  StoredProcedure [dbo].[ImportIngestedTextsFromPath_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================

CREATE PROCEDURE [dbo].[ImportIngestedTextsFromPath_sp]
AS
BEGIN

	SET NOCOUNT ON;
	DECLARE @udpxml xml
	SELECT @udpxml = P
	FROM OPENROWSET(BULK 'D:\xmlimports\texts.xml', SINGLE_BLOB) AS xmldata(P)

	CREATE TABLE #tmp_phraseImport([phrase] NVARCHAR(250),
	[locationFromStart] INT,
	[rowInText] INT ,
	[locationInRow] INT ,
	[textId] INT,
	[wordNumberInText] INT);

	DECLARE @hdoc INT
    
	EXEC sp_xml_preparedocument @hdoc OUTPUT, @udpxml;

	SELECT *
	INTO #tmp_xmlload
	FROM OPENXML (@hdoc, '/texts/text', 1)
	WITH (
		title NVARCHAR(250),
		totalWords INT,
		totalRows INT,
		totalCharacters INT)

	SELECT *
	INTO #tmp_xmlloadinfo
	FROM OPENXML (@hdoc, '/texts/text/info/row', 2)
	WITH (
		title NVARCHAR(250) '../../@title',
		attributeKey NVARCHAR(50),
		attributeValue NVARCHAR(250))

	SELECT *
	INTO #tmp_xmlloadrows
	FROM OPENXML (@hdoc, '/texts/text/phrases/row', 2)
	WITH (
		title NVARCHAR(250) '../../@title',
		phrase NVARCHAR(250),
        locationFromStart INT,
        rowInText INT,
        locationInRow INT,
        wordNumberInText INT)

	EXEC sp_xml_removedocument @hdoc

	DELETE FROM #tmp_xmlloadrows WHERE title IN (SELECT title FROM [dbo].[text_tbl])
	DELETE FROM #tmp_xmlload WHERE title IN (SELECT title FROM [dbo].[text_tbl])
	DELETE FROM #tmp_xmlloadinfo WHERE title IN (SELECT title FROM [dbo].[text_tbl])

	INSERT INTO [dbo].[text_tbl] (title, totalWords, totalRows, totalCharacters)
	SELECT title ,totalWords ,totalRows ,totalCharacters
	FROM #tmp_xmlload

	INSERT INTO #tmp_phraseImport([phrase],[locationFromStart], [rowInText], [locationInRow], [textId],[wordNumberInText])
	SELECT r.phrase, r.locationFromStart, r.rowInText, r.locationInRow, t.id, r.wordNumberInText
	FROM #tmp_xmlloadrows r
	INNER JOIN [dbo].[text_tbl] t ON r.title = t.title

	INSERT INTO [dbo].[text_info_tbl]([text_id], [attributeKey], [attributeValue])
	SELECT t.id , f.attributeKey, f.attributeValue 
	FROM #tmp_xmlloadinfo f
	INNER JOIN [dbo].[text_tbl] t ON f.title = t.title

	INSERT INTO [dbo].[phrase_tbl]([phrase],[locationFromStart],[rowInText],[locationInRow],[textId],[wordNumberInText]
		,[isDefinedByUser])
	SELECT [phrase],[locationFromStart], [rowInText], [locationInRow], [textId],[wordNumberInText], 0
	FROM #tmp_phraseImport

	INSERT INTO [dbo].[phrase_tbl] ([phrase], [locationFromStart], [rowInText], [locationInRow], [textId], 
		[wordNumberInText], [isDefinedByUser])
	SELECT i.phrase, [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText], 1
	FROM [dbo].[phrase_tbl] p
	inner JOIN [dbo].[userDefinedPhrase_tbl] i ON  i.phrase = 
		LTRIM(RTRIM([dbo].[GetTextByIndexs_f](p.[textId], '', p.[wordNumberInText], p.[wordNumberInText] + [dbo].[GetWordCount_f](i.phrase) - 1)))
	WHERE p.textId IN (SELECT textId FROM #tmp_phraseImport);

	DROP TABLE #tmp_phraseImport;
	DROP TABLE #tmp_xmlloadinfo;
	DROP TABLE #tmp_xmlload;
	DROP TABLE #tmp_xmlloadrows;

END
GO
/****** Object:  StoredProcedure [dbo].[ImportUserDefinedGroups_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ImportUserDefinedGroups_sp]
	@udpxml XML
AS
BEGIN
	SET NOCOUNT ON;
	--DECLARE @x xml
	--SELECT @x = P
	--FROM OPENROWSET (BULK 'C:\Examples\Products.xml', SINGLE_BLOB) AS Products(P)
	--DECLARE @udpxml XML = '<groups><group name="gaf"><phrases><row><phrase> vxbc</phrase></row><row><phrase>dfdfg</phrase></row><row><phrase>wertert</phrase></row></phrases></group><group name="animals"><phrases><row><phrase>cat</phrase></row><row><phrase>dog</phrase></row><row><phrase>fish</phrase></row></phrases></group></groups>';
	CREATE TABLE #tmp_udgImport(name nvarchar(50), id INT ,phrase nvarchar(50));
	DECLARE @hdoc INT
    
	EXEC sp_xml_preparedocument @hdoc OUTPUT, @udpxml;

	SELECT *
	INTO #tmp_xmlload
	FROM OPENXML (@hdoc, '/groups/group/phrases/row', 2)
	WITH (
		groupid NVARCHAR(50) '../../@name',
		phrase nvarchar(250))

	EXEC sp_xml_removedocument @hdoc

	INSERT INTO #tmp_udgImport(name,phrase)
	SELECT * FROM #tmp_xmlload;

	INSERT INTO [dbo].[userDefinedGroup_tbl]([name])
	SELECT DISTINCT(LTRIM(RTRIM(name))) FROM #tmp_udgImport
	WHERE name NOT IN (SELECT [name] FROM [dbo].[userDefinedGroup_tbl]);	

	UPDATE #tmp_udgImport SET #tmp_udgImport.id = [dbo].[userDefinedGroup_tbl].id
	FROM [dbo].[userDefinedGroup_tbl]
	INNER JOIN #tmp_udgImport ON #tmp_udgImport.name = [dbo].[userDefinedGroup_tbl].name;

	INSERT INTO [dbo].[userDefinedGroupWords_tbl]([groupId], [phrase])
	SELECT [id], [phrase]
	FROM #tmp_udgImport
	WHERE (CAST(id AS NVARCHAR) + phrase) NOT IN (SELECT (CAST([groupId] AS NVARCHAR) + [phrase])
												  FROM [dbo].[userDefinedGroupWords_tbl]);

	DROP TABLE #tmp_udgImport;
	DROP TABLE #tmp_xmlload;

END
GO
/****** Object:  StoredProcedure [dbo].[ImportUserDefinedGroupsFromPath_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ImportUserDefinedGroupsFromPath_sp]
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @udpxml xml
	SELECT @udpxml = P
	FROM OPENROWSET(BULK 'D:\xmlimports\wordGroups.xml', SINGLE_BLOB) AS xmldata(P)
	CREATE TABLE #tmp_udgImport(name nvarchar(50), id INT ,phrase nvarchar(50));
	DECLARE @hdoc INT
    
	EXEC sp_xml_preparedocument @hdoc OUTPUT, @udpxml;

	SELECT *
	INTO #tmp_xmlload
	FROM OPENXML (@hdoc, '/groups/group/phrases/row', 2)
	WITH (
		groupid NVARCHAR(50) '../../@name',
		phrase nvarchar(250))

	EXEC sp_xml_removedocument @hdoc

	INSERT INTO #tmp_udgImport(name,phrase)
	SELECT * FROM #tmp_xmlload;

	INSERT INTO [dbo].[userDefinedGroup_tbl]([name])
	SELECT DISTINCT(LTRIM(RTRIM(name))) FROM #tmp_udgImport
	WHERE name NOT IN (SELECT [name] FROM [dbo].[userDefinedGroup_tbl]);	

	UPDATE #tmp_udgImport SET #tmp_udgImport.id = [dbo].[userDefinedGroup_tbl].id
	FROM [dbo].[userDefinedGroup_tbl]
	INNER JOIN #tmp_udgImport ON #tmp_udgImport.name = [dbo].[userDefinedGroup_tbl].name;

	INSERT INTO [dbo].[userDefinedGroupWords_tbl]([groupId], [phrase])
	SELECT [id], [phrase]
	FROM #tmp_udgImport
	WHERE (CAST(id AS NVARCHAR) + phrase) NOT IN (SELECT (CAST([groupId] AS NVARCHAR) + [phrase])
												  FROM [dbo].[userDefinedGroupWords_tbl]);

	DROP TABLE #tmp_udgImport;
	DROP TABLE #tmp_xmlload;

END
GO
/****** Object:  StoredProcedure [dbo].[ImportUserDefinedPhrases_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ImportUserDefinedPhrases_sp]
	@udpxml XML
AS
BEGIN
	SET NOCOUNT ON;
	--DECLARE @x xml
	--SELECT @x = P
	--FROM OPENROWSET (BULK 'C:\Examples\Products.xml', SINGLE_BLOB) AS Products(P)
	--DECLARE @udpxml XML = '<row><phrase>Golden Fleece</phrase></row>';
	CREATE TABLE #tmp_udpImport(phrase nvarchar(250), wordcount INT);
	DECLARE @hdoc INT
    
	EXEC sp_xml_preparedocument @hdoc OUTPUT, @udpxml
	SELECT *
	INTO #tmp_xmlload
	FROM OPENXML (@hdoc, '/root/data', 2)
	WITH (phrase varchar(250))

	EXEC sp_xml_removedocument @hdoc

	INSERT INTO #tmp_udpImport(phrase)
	SELECT * FROM #tmp_xmlload;

	UPDATE #tmp_udpImport SET wordcount = [dbo].[GetWordCount_f](phrase);

	DELETE FROM #tmp_udpImport
	WHERE phrase IN (SELECT phrase FROM [dbo].[phrase_tbl])

	INSERT INTO [dbo].[userDefinedPhrase_tbl] ([phrase])
	SELECT phrase FROM #tmp_udpImport;

	INSERT INTO [dbo].[phrase_tbl] ([phrase], [locationFromStart], [rowInText], [locationInRow], [textId], 
		[wordNumberInText], [isDefinedByUser])
	SELECT i.phrase, [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText], 1
	FROM [dbo].[phrase_tbl] p
	inner JOIN  #tmp_udpImport i ON  i.phrase = 
		LTRIM(RTRIM([dbo].[GetTextByIndexs_f](p.[textId], '', p.[wordNumberInText], p.[wordNumberInText] + i.wordcount - 1)))
	--SELECT i.phrase, LTRIM(RTRIM([dbo].[GetTextByIndexs_f](p.[textId], '', p.[wordNumberInText], p.[wordNumberInText] + i.wordcount - 1))) AS calc, 
	-- [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText], 1
	--FROM [dbo].[phrase_tbl] p ,#tmp_udpImport i

	DROP TABLE #tmp_udpImport;
	DROP TABLE #tmp_xmlload;

END
GO
/****** Object:  StoredProcedure [dbo].[ImportUserDefinedPhrasesFromPath_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ImportUserDefinedPhrasesFromPath_sp]
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @udpxml xml
	SELECT @udpxml = P
	FROM OPENROWSET(BULK 'D:\xmlimports\userDefinedPhrases.xml', SINGLE_BLOB) AS xmldata(P)
	CREATE TABLE #tmp_udpImport(phrase nvarchar(250), wordcount INT);
	DECLARE @hdoc INT
    
	EXEC sp_xml_preparedocument @hdoc OUTPUT, @udpxml
	SELECT *
	INTO #tmp_xmlload
	FROM OPENXML (@hdoc, '/root/data', 2)
	WITH (phrase varchar(250))

	EXEC sp_xml_removedocument @hdoc

	INSERT INTO #tmp_udpImport(phrase)
	SELECT * FROM #tmp_xmlload;

	UPDATE #tmp_udpImport SET wordcount = [dbo].[GetWordCount_f](phrase);

	DELETE FROM #tmp_udpImport
	WHERE phrase IN (SELECT phrase FROM [dbo].[phrase_tbl])

	INSERT INTO [dbo].[userDefinedPhrase_tbl] ([phrase])
	SELECT phrase FROM #tmp_udpImport;

	INSERT INTO [dbo].[phrase_tbl] ([phrase], [locationFromStart], [rowInText], [locationInRow], [textId], 
		[wordNumberInText], [isDefinedByUser])
	SELECT i.phrase, [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText], 1
	FROM [dbo].[phrase_tbl] p
	inner JOIN  #tmp_udpImport i ON  i.phrase = 
		LTRIM(RTRIM([dbo].[GetTextByIndexs_f](p.[textId], '', p.[wordNumberInText], p.[wordNumberInText] + i.wordcount - 1)))
	--SELECT i.phrase, LTRIM(RTRIM([dbo].[GetTextByIndexs_f](p.[textId], '', p.[wordNumberInText], p.[wordNumberInText] + i.wordcount - 1))) AS calc, 
	-- [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText], 1
	--FROM [dbo].[phrase_tbl] p ,#tmp_udpImport i

	DROP TABLE #tmp_udpImport;
	DROP TABLE #tmp_xmlload;

END
GO
/****** Object:  StoredProcedure [dbo].[IngestNewTextMultyLevelProcess_StepOne_CreateTextEntity_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[IngestNewTextMultyLevelProcess_StepOne_CreateTextEntity_sp]
	@title NVARCHAR(250)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @newtextid INT = null;
	
	INSERT INTO [dbo].[text_tbl]([title],[totalWords],[totalRows],[totalCharacters])
    VALUES(@title, 0,0,0);

	SELECT @newtextid = SCOPE_IDENTITY();

	SELECT @newtextid as id;
END
GO
/****** Object:  StoredProcedure [dbo].[IngestNewTextMultyLevelProcess_StepThree_ApplyUDP_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[IngestNewTextMultyLevelProcess_StepThree_ApplyUDP_sp]
	@textid INT
AS
BEGIN
	SET NOCOUNT ON;
	--handle user defined prases
	INSERT INTO  [dbo].[phrase_tbl]([phrase], [locationFromStart], [rowInText], [locationInRow],[textId], [wordNumberInText], [isDefinedByUser])
	SELECT udp.phrase, p.[locationFromStart], p.[rowInText], p.[locationInRow], @textid, p.[wordNumberInText], 1
	FROM [dbo].[userDefinedPhrase_tbl] udp
	INNER JOIN [dbo].[phrase_tbl] p ON p.phrase = udp.phrase AND p.[textId] = @textid
	WHERE [dbo].[GetTextByIndexsNonRecurcive_f](@textid, p.wordNumberInText, p.wordNumberInText + (SELECT COUNT(*) FROM STRING_SPLIT(udp.phrase,' '))) = udp.phrase 
END
GO
/****** Object:  StoredProcedure [dbo].[IngestNewTextMultyLevelProcess_StepTwo_AddNewRow_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[IngestNewTextMultyLevelProcess_StepTwo_AddNewRow_sp]
	@row NVARCHAR(max),
	@textid INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @runningtext NVARCHAR(max) = RTRIM(LTRIM(@row));
	DECLARE @currentwordinrow INT = 0;
	DECLARE @currentrow INT;
	DECLARE @str NVARCHAR(250);
	DECLARE @currentwordintext INT;
	DECLARE @currentcharacterintext INT;
	DECLARE @temp_phrase_tbl TABLE([phrase] NVARCHAR(250), [locationFromStart] INT, [rowInText] INT, [locationInRow] INT,
		[wordNumberInText] INT)

	SELECT
		@currentwordintext = isnull(pt.[wordNumberInText],0),
		@currentcharacterintext = isnull((isNull(pt.[locationFromStart],0) + LEN(phrase)), 0),
		@currentrow = isnull(pt.[rowInText] + 1,0)
	FROM [dbo].[phrase_tbl] pt
	WHERE textId = @textid
		AND [wordNumberInText] = (SELECT MAX([wordNumberInText])
								  FROM [dbo].[phrase_tbl]
								  WHERE textId = @textid)

	WHILE(@runningtext != '')
	BEGIN
		-- handle next word
		SET @str = [dbo].[GetNextPhraseInText_f](@runningtext);
		SET @currentwordinrow = (@currentwordinrow + 1);
		SET @currentwordintext = (@currentwordintext + 1);
		
		--PRINT '@str :' + @str + ' num:' + CAST(@currentwordscounter AS NVARCHAR) + 'SUBSTRING(@runningtext, 1, 3):'+
		--SUBSTRING(@runningtext, 1, 3);
		INSERT INTO @temp_phrase_tbl([phrase], [locationFromStart], [rowInText], [locationInRow], [wordNumberInText])
		VALUES(@str, ISNULL(@currentcharacterintext,0), ISNULL(@currentrow,0), @currentwordinrow, ISNULL(@currentwordintext,0))

		SET @currentcharacterintext = ISNULL((@currentcharacterintext + LEN(@str)),0);

		--PRINT ' LEN(@runningtext):' + CAST(LEN(@runningtext) AS NVARCHAR) + '  '+ ' LEN(@str):' + CAST(LEN(@str) AS NVARCHAR);
		-- prepering the running text for next pass
		SET @runningtext = RTRIM(LTRIM(@runningtext));
		SET @runningtext = RIGHT(@runningtext,LEN(@runningtext) - LEN(@str));
		SET @runningtext = RTRIM(LTRIM(@runningtext));
	END

	INSERT INTO [dbo].[phrase_tbl]([phrase], [locationFromStart], [rowInText], [locationInRow], [textId], [wordNumberInText], [isDefinedByUser])
	SELECT [phrase], [locationFromStart], [rowInText], [locationInRow], @textid, [wordNumberInText], 0
	FROM @temp_phrase_tbl;

END
GO
/****** Object:  StoredProcedure [dbo].[SearchPhrase_sp]    Script Date: 11/24/2019 12:09:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SearchPhrase_sp]
	@phrase INT,
	@textid INT = NULL
AS
BEGIN

	SET NOCOUNT ON;
	IF (@textid IS null)
	BEGIN
		SELECT [id], [phrase] ,[locationFromStart],[rowInText] ,[locationInRow],[textId],[wordNumberInText],[isDefinedByUser]
		FROM [dbo].[phrase_tbl]
    END
	ELSE 
	BEGIN
		SELECT [id], [phrase] ,[locationFromStart],[rowInText] ,[locationInRow],[textId],[wordNumberInText],[isDefinedByUser]
		FROM [dbo].[phrase_tbl]
		WHERE textId = @textid
    END

END
GO
USE [master]
GO
ALTER DATABASE [SadnaProject] SET  READ_WRITE 
GO

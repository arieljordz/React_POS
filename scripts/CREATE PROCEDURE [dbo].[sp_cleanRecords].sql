USE [POS_DB]
GO
/****** Object:  StoredProcedure [dbo].[sp_cleanRecords]    Script Date: 6/19/2023 11:58:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_cleanRecords]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
		
	DELETE FROM [dbo].[ProductDetails]
		dbcc checkident ('[dbo].[ProductDetails]', reseed, 0) 

	DELETE FROM [dbo].[Products]
		dbcc checkident ('[dbo].[Products]', reseed, 0) 

	DELETE FROM [dbo].[UserTypes]
		dbcc checkident ('[dbo].[UserTypes]', reseed, 0) 

	DELETE FROM [dbo].[Users]
		dbcc checkident ('[dbo].[Users]', reseed, 0) 

	SELECT 'Cleaning completed!'

END

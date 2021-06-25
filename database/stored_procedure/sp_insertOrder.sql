CREATE PROC sp_insertOrder (@time nvarchar(50),
							@customer_id bigint,
							@restaurant_id bigint,
							@table_type int,
							@number_of_guests int,
							@note nvarchar(MAX),
							@organize_date datetime)
AS
DECLARE @status_id bigint
SELECT @status_id = (SELECT id FROM status WHERE name like N'draft')
BEGIN
	INSERT INTO [dbo].[orders]
           ([time]
           ,[order_date]
           ,[status_id]
           ,[customer_id]
           ,[restaurant_id]
           ,[table_type]
           ,[number_of_guests]
           ,[note]
		   ,[organize_date])
     VALUES
           (@time
		   ,GETDATE()
		   ,@status_id
		   ,@customer_id
		   ,@restaurant_id
		   ,@table_type
		   ,@number_of_guests
		   ,@note
		   ,@organize_date)
END

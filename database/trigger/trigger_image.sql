CREATE TRIGGER [dbo].[insert_null_id]
ON [dbo].[images]
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @id varchar(255), @name nvarchar(50), @value varbinary(MAX), @user_id int, @dish_id int,  
			@service_id int, @combo_id int, @restaurant_id int, @promotion_id int, @type_id int;
    SELECT @id = id, @name = name, @value = value, @user_id = user_id, @dish_id = dish_id,  
			@service_id = service_id, @combo_id = combo_id, @restaurant_id = restaurant_id, @promotion_id = promotion_id, 
			@type_id = type_id
    FROM inserted
	IF (@user_id = 0)
		BEGIN
		 SET @user_id = NULL
		END
	IF (@dish_id = 0)
		BEGIN
		 SET @dish_id = NULL
		END
	IF (@service_id = 0)
		BEGIN
		 SET @service_id = NULL
		END
	IF (@combo_id = 0)
		BEGIN
		 SET @combo_id = NULL
		END
	IF (@restaurant_id = 0)
		BEGIN
		 SET @restaurant_id = NULL
		END
	IF (@promotion_id = 0)
		BEGIN
		 SET @promotion_id = NULL
		END
	INSERT INTO [dbo].[images] ([id], [name], [value], [user_id], [dish_id], [service_id], [combo_id], [restaurant_id], 
	[promotion_id], [type_id])
    VALUES (@id, @name, @value, @user_id, @dish_id, @service_id, @combo_id, @restaurant_id, @promotion_id, @type_id)
END

INSERT [dbo].[images] ([id], [value], [name], [user_id],[dish_id],[service_id],[combo_id],[restaurant_id],[promotion_id],[type_id]) 
VALUES (N'7c399924-ffb5-4f93-a30c-63f95b4d42ehhhh', 
'aa.png', 10, 0, 0, 0, 0, 0, 1)
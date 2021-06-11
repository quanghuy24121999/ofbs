CREATE PROCEDURE sp_getDishesByRestaurantId
	@restaurant_id int, @category_id int 
AS
DECLARE @menu_category nvarchar(50)
IF (@category_id = 1)
	BEGIN
		 SET @menu_category = N'Khai vị'
	END
IF (@category_id = 2) 
	BEGIN
		SET @menu_category = N'Món chính'
	END
IF (@category_id = 3) 
	BEGIN
		SET @menu_category = N'Tráng miệng'
	END
IF (@category_id = 4) 
	BEGIN
		SET @menu_category = N'Đồ uống'
	END
BEGIN
	SELECT d.id, d.name as dish_name, img.id as image_dish_id, d.price
	FROM dishes d 
		join images img on img.dish_id = d.id
		join menu_categories cat on d.menu_category_id = cat.id
		WHERE d.restaurant_id = @restaurant_id and cat.name like @menu_category
END

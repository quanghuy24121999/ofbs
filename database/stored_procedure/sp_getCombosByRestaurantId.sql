CREATE PROCEDURE sp_getCombosByRestaurantId
	@restaurant_id int
AS
BEGIN
	SELECT cb.id as combo_id, img.id as image_combo_id, cb.name as combo_name, d.id as dish_id, d.name as dish_name, 
	d.menu_category_id, cb.price as combo_price
	FROM dish_combo d_cb 
		join combos cb on cb.id = d_cb.combo_id
		join dishes d on d.id = d_cb.dish_id
		join images img on img.combo_id = cb.id 
	WHERE cb.restaurant_id =  @restaurant_id
	ORDER BY cb.id asc, d.menu_category_id asc
END

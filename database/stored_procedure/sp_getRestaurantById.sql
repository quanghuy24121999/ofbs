CREATE PROCEDURE sp_getRestaurantById
	@restaurant_id bigint
AS
BEGIN
	SELECT res.id as restaurantId, img_tp.image_type as imageType, pr_tp.name, res.restaurant_name as restaurantName, 
			img.id as imageId, res.province, res.description, res.size, AVG(fb.rate) as rate
	FROM provider_restaurants res 
		join provider_types pr_tp on pr_tp.id =  res.provider_type_id 
		join images img on img.restaurant_id = res.id
		join image_types img_tp on img.type_id = img_tp.id
		join feedbacks fb on  fb.restaurant_id = res.id
	WHERE res.id = @restaurant_id
	GROUP BY res.id, res.restaurant_name, img.id, res.province, res.size, img_tp.image_type, pr_tp.name, res.description
END

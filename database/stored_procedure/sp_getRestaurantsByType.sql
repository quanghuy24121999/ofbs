CREATE PROCEDURE sp_getRestaurantsByType
	@restaurant_type bigint
AS
BEGIN
	declare @_type nvarchar(255);
	IF (@restaurant_type = 1)
	BEGIN
		set @_type = N'Tổ chức lưu động';
	END
	IF (@restaurant_type = 2) 
	BEGIN
		set @_type = N'Tổ chức tại cơ sở';
	END
	SELECT TOP 10 res.id as restaurantId, img_tp.image_type as imageType, pr_tp.name, res.restaurant_name as restaurantName, 
	img.id as imageId, res.province,
				res.size, AVG(fb.rate) as rate
				FROM provider_restaurants res 
					join provider_types pr_tp on pr_tp.id =  res.provider_type_id 
						join images img on img.restaurant_id = res.id
					join image_types img_tp on img.type_id = img_tp.id
					join feedbacks fb on  fb.restaurant_id = res.id
				WHERE img_tp.image_type like 'Avatar' and pr_tp.name like @_type
				GROUP BY res.id, res.restaurant_name, img.id, res.province, res.size, img_tp.image_type, pr_tp.name
				ORDER BY rate desc
END

CREATE PROC sp_getRestaurantsByProviderId  @provider_id bigint,
										  @restaurant_status_id bigint
AS
DECLARE @restaurant_status nvarchar(50), @sql_select nvarchar(MAX), @sql_where nvarchar(MAX), @sql_group nvarchar(MAX)
BEGIN
IF (@restaurant_status_id = 1)
	BEGIN
		 SET @restaurant_status = N'active'
	END
IF (@restaurant_status_id = 2) 
	BEGIN
		SET @restaurant_status = N'inactive'
	END
IF (@restaurant_status_id = 3) 
	BEGIN
		SET @restaurant_status = N'pending'
	END

SET @sql_select = 'SELECT res.id as restaurant_id, img_tp.image_type, pr_tp.name as restaurant_type, res.restaurant_name, img.id as image_id, 
						res.province, res.size, AVG(fb.rate) as rate, res.description, status.name as restaurant_status
				   FROM provider_restaurants res 
						join provider_types pr_tp on pr_tp.id =  res.provider_type_id 
						left join images img on img.restaurant_id = res.id
						left join image_types img_tp on img.type_id = img_tp.id
						left join feedbacks fb on  fb.restaurant_id = res.id
						join status on status.id = res.status_id
					WHERE res.provider_id = '+ CAST(@provider_id as nvarchar(50))
					+   ' and status.name like N' + '''' + @restaurant_status + ''''

IF(@restaurant_status_id <> 3)
BEGIN
	SET @sql_where = ' and img_tp.image_type like ' + '''' + 'Avatar' + '''' 
END
SET @sql_group = ' GROUP BY res.id, res.restaurant_name, img.id, res.province, res.size, img_tp.image_type, pr_tp.name, res.description, status.name'
EXEC (@sql_select + @sql_where + @sql_group)
END

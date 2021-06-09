CREATE PROCEDURE sp_getFeedbackByRestaurantId
	@restaurant_id int
AS
BEGIN
	SELECT users.id as user_id, users.name as user_name, img.id as image_user_id, fb.rate, fb.feedback_content, fb.feedback_date, fb.restaurant_id
	FROM feedbacks fb
		join users on fb.customer_id = users.id
		join images img on img.user_id = fb.customer_id
	WHERE fb.restaurant_id =  @restaurant_id
END
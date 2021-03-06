USE [OFBS]
GO
SET IDENTITY_INSERT [dbo].[orders] ON 

INSERT [dbo].[orders] ([id], [amount], [time], [order_date], [status_id], [customer_id], [restaurant_id], [promotion_id]) VALUES (1, 88600000, N'Tối 01/06/2021', CAST(N'2021-04-01T00:00:00.000' AS DateTime), 5, 7, 30, NULL)
INSERT [dbo].[orders] ([id], [amount], [time], [order_date], [status_id], [customer_id], [restaurant_id], [promotion_id]) VALUES (2, 57100000, N'Tối 30/06/2021', CAST(N'2021-03-15T00:00:00.000' AS DateTime), 4, 7, 30, NULL)
INSERT [dbo].[orders] ([id], [amount], [time], [order_date], [status_id], [customer_id], [restaurant_id], [promotion_id]) VALUES (4, 55000000, N'Tối 30/06/2021', CAST(N'2021-06-01T00:00:00.000' AS DateTime), 6, 7, 30, 4)
INSERT [dbo].[orders] ([id], [amount], [time], [order_date], [status_id], [customer_id], [restaurant_id], [promotion_id]) VALUES (5, 102100000, N'Tối 30/08/2021', CAST(N'2021-06-20T00:00:00.000' AS DateTime), 3, 7, 30, 4)
SET IDENTITY_INSERT [dbo].[orders] OFF
GO
SET IDENTITY_INSERT [dbo].[order_details] ON 

INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (1, 1100000, 50, NULL, 1, NULL, 1)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (2, 30000000, 1, NULL, NULL, 24, 1)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (3, 2000000, 1, NULL, NULL, 12, 1)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (4, 800000, 1, NULL, NULL, 15, 1)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (5, 800000, 1, NULL, NULL, 18, 1)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (6, 100000, 20, 2, NULL, NULL, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (7, 100000, 20, 3, NULL, NULL, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (9, 100000, 20, 4, NULL, NULL, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (10, 100000, 20, 5, NULL, NULL, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (11, 100000, 20, 6, NULL, NULL, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (12, 100000, 20, 7, NULL, NULL, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (13, 100000, 20, 9, NULL, NULL, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (14, 100000, 20, 10, NULL, NULL, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (15, 100000, 20, 27, NULL, NULL, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (16, 100000, 20, 28, NULL, NULL, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (17, 30000000, 1, NULL, NULL, 25, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (18, 2000000, 1, NULL, NULL, 13, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (19, 800000, 1, NULL, NULL, 15, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (20, 800000, 1, NULL, NULL, 18, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (21, 3000000, 1, NULL, NULL, 20, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (22, 500000, 1, NULL, NULL, 21, 2)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (23, 1100000, 50, NULL, 5, NULL, 4)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (24, 100000, 50, 42, NULL, NULL, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (25, 100000, 50, 43, NULL, NULL, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (26, 100000, 50, 44, NULL, NULL, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (27, 100000, 50, 45, NULL, NULL, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (28, 100000, 50, 46, NULL, NULL, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (29, 100000, 50, 47, NULL, NULL, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (30, 100000, 50, 48, NULL, NULL, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (31, 100000, 50, 49, NULL, NULL, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (32, 100000, 50, 50, NULL, NULL, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (33, 100000, 50, 51, NULL, NULL, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (34, 100000, 50, 27, NULL, NULL, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (35, 100000, 50, 28, NULL, NULL, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (36, 30000000, 1, NULL, NULL, 26, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (37, 2000000, 1, NULL, NULL, 13, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (38, 800000, 1, NULL, NULL, 15, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (39, 800000, 1, NULL, NULL, 18, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (40, 3000000, 1, NULL, NULL, 20, 5)
INSERT [dbo].[order_details] ([id], [price], [quantity], [dish_id], [combo_id], [service_id], [order_id]) VALUES (41, 500000, 1, NULL, NULL, 23, 5)
SET IDENTITY_INSERT [dbo].[order_details] OFF
GO

USE [POS_DB]
GO
/****** Object:  Table [dbo].[ProductDetails]    Script Date: 9/4/2023 5:51:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Quantity] [int] NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[DateAdded] [datetime2](7) NULL,
	[ExpirationDate] [datetime2](7) NULL,
 CONSTRAINT [PK_ProductDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 9/4/2023 5:51:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[DetailsId] [int] NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 9/4/2023 5:51:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](max) NULL,
	[MiddleName] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
	[FullName] [nvarchar](max) NULL,
	[Username] [nvarchar](max) NULL,
	[Password] [nvarchar](max) NULL,
	[UserTypeId] [int] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserTypes]    Script Date: 9/4/2023 5:51:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserTypes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_UserTypes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ProductDetails] ON 

INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (1, 74, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:05:49.3602666' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (2, 73, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:05:59.6761132' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (3, 79, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:06:09.6916244' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (4, 77, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:06:21.0768789' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (5, 73, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:06:32.7170745' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (6, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:06:42.4442999' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (7, 99, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:06:52.5468683' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (8, 88, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:07:01.8607508' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (9, 98, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:07:14.2660428' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (10, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:07:23.0607272' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (11, 95, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:07:32.8643529' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (12, 98, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:07:41.6755672' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (13, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:07:51.4574042' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (14, 98, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:08:08.8983179' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (15, 99, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:08:17.4285655' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (16, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:08:26.8841954' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (17, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:08:36.2258718' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (18, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:08:44.8442878' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (19, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:08:53.0998331' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (20, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:09:01.9557351' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (21, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:09:13.3633319' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (22, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:09:22.3305669' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (23, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:09:30.1551137' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (24, 97, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:09:38.1793545' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (25, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:09:46.2678057' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (26, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:09:55.3061303' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (27, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:10:03.1629664' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (28, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:10:11.6199215' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (29, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:10:19.3720841' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (30, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:10:28.1803690' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (31, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:10:36.9537203' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (32, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:10:45.7557961' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (33, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:10:54.0206173' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (34, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:11:03.5383154' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (35, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:11:12.5234810' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (36, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:11:20.6117656' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (37, 100, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:11:29.0991409' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (38, 95, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:11:37.6583012' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (39, 99, CAST(5.00 AS Decimal(18, 2)), CAST(N'2023-06-20T00:11:45.5632889' AS DateTime2), CAST(N'2023-06-20T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (40, 100, CAST(1.00 AS Decimal(18, 2)), CAST(N'2023-09-03T12:14:24.1164976' AS DateTime2), CAST(N'2023-09-03T00:00:00.0000000' AS DateTime2))
INSERT [dbo].[ProductDetails] ([Id], [Quantity], [Price], [DateAdded], [ExpirationDate]) VALUES (41, 200, CAST(1.00 AS Decimal(18, 2)), CAST(N'2023-09-03T12:41:03.9348098' AS DateTime2), CAST(N'2023-09-03T00:00:00.0000000' AS DateTime2))
SET IDENTITY_INSERT [dbo].[ProductDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[Products] ON 

INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (1, N'Acyclovir', 1)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (2, N'Amoxicillin', 2)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (3, N'Amlodipine', 3)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (4, N'Ascorbic acid', 4)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (5, N'Atorvastatin', 5)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (6, N'Cefaclor', 6)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (7, N'Cefuroxime', 7)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (8, N'Celecoxib', 8)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (9, N'Co-amoxiclav', 9)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (10, N'Dapagliflozin', 10)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (11, N'Cetirizine', 11)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (12, N'Diosmin', 12)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (13, N'Erythromycin', 13)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (14, N'Febuxostat', 14)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (15, N'Fluconazole', 15)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (16, N'Glimepiride', 16)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (17, N'Ibandronic Acid', 17)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (18, N'Insulin', 18)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (19, N'Keltican', 19)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (20, N'Ketoconazole', 20)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (21, N'Lacidipine', 21)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (22, N'Levocetirizine', 22)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (23, N'Levofloxacin', 23)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (24, N'Levothyroxine', 24)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (25, N'Losartan', 25)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (26, N'Olanzapine', 26)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (27, N'Omeprazole', 27)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (28, N'Pantoprazole', 28)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (29, N'Paracetamol', 29)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (30, N'Pregabalin', 30)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (31, N'Propan', 31)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (32, N'Quetiapine', 32)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (33, N'Rifampicin', 33)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (34, N'Rupatadine fumarate', 34)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (35, N'Sertraline', 35)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (36, N'Teneligliptin', 36)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (37, N'Tobramycin', 37)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (38, N'Tranexamic', 38)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (39, N'Vildagliptin', 39)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (40, N'sample', 40)
INSERT [dbo].[Products] ([Id], [Description], [DetailsId]) VALUES (41, N'safdfdgdsfsd', 41)
SET IDENTITY_INSERT [dbo].[Products] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [FirstName], [MiddleName], [LastName], [FullName], [Username], [Password], [UserTypeId]) VALUES (3, N'Jordz', N'Jordz', N'Jordz', N'Jordz J. Jordz', N'jordz', N'jordz', 1)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET IDENTITY_INSERT [dbo].[UserTypes] ON 

INSERT [dbo].[UserTypes] ([Id], [Description]) VALUES (1, N'Manager')
INSERT [dbo].[UserTypes] ([Id], [Description]) VALUES (2, N'Cashier')
SET IDENTITY_INSERT [dbo].[UserTypes] OFF
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_ProductDetails_DetailsId] FOREIGN KEY([DetailsId])
REFERENCES [dbo].[ProductDetails] ([Id])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_ProductDetails_DetailsId]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_UserTypes_UserTypeId] FOREIGN KEY([UserTypeId])
REFERENCES [dbo].[UserTypes] ([Id])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_UserTypes_UserTypeId]
GO

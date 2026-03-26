package com.ideez.agency.entity;

public class JobRole {
    public static final String STRATEGY_PLANNER = "Strategy Planner";
    public static final String CLIENT_MANAGER = "Client Manager";
    public static final String SALES_PERSON = "Sales Person";
    public static final String SOCIAL_MEDIA_MANAGER = "Social Media Manager";
    public static final String CONTENT_CREATOR = "Content Creator";
    public static final String GRAPHIC_DESIGNER = "Graphic Designer";
    public static final String VIDEO_EDITOR = "Video Editor";
    public static final String COPYWRITER = "Copywriter";
    public static final String ADS_MANAGER = "Ads Manager";
    public static final String SEO_BEGINNER = "SEO Beginner";
    public static final String DATA_ANALYST = "Data Analyst";
    public static final String CUSTOMER_SUPPORT = "Customer Support";
    public static final String BRAND_MANAGER = "Brand Manager";
    public static final String RESEARCHER = "Researcher";

    public static String[] getAllRoles() {
        return new String[]{
            STRATEGY_PLANNER,
            CLIENT_MANAGER,
            SALES_PERSON,
            SOCIAL_MEDIA_MANAGER,
            CONTENT_CREATOR,
            GRAPHIC_DESIGNER,
            VIDEO_EDITOR,
            COPYWRITER,
            ADS_MANAGER,
            SEO_BEGINNER,
            DATA_ANALYST,
            CUSTOMER_SUPPORT,
            BRAND_MANAGER,
            RESEARCHER
        };
    }
}

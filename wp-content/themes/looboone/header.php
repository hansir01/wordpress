<!DOCTYPE html>
<html itemscope="itemscope" itemtype="http://schema.org/WebPage">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title itemprop="name"><?php global $page, $paged;wp_title( '|', true, 'right' );bloginfo( 'name' );$site_description = get_bloginfo( 'description', 'display' );if ( $site_description && ( is_home() || is_front_page() ) ) echo " | $site_description";if ( $paged >= 2 || $page >= 2 ) echo ' | ' . sprintf( __( '第 %s 页'), max( $paged, $page ) );?></title>
	<link rel="stylesheet" href="<?php bloginfo('template_url')?>/css/main.css" type="text/css" media="all">
	<link rel="stylesheet" href="<?php bloginfo('template_url')?>/css/style.css" type="text/css" media="all">
    <link rel="stylesheet" href="<?php bloginfo('template_url')?>/font/iconfont.css" type="text/css" media="all">
    <link rel="stylesheet" href="<?php bloginfo('template_url')?>/css/layout.css" type="text/css" media="all">
<?php wp_head(); ?>
</head>
<body>
    <div class="snap-drawers">
        <div class="snap-drawer snap-drawer-left">
            <div class="mobile-menu">
                <ul id="mobile-menu" class="menu">
                   <?php wp_nav_menu( array( 'theme_location' => 'mobile', 'container' => false ) ); ?>
                </ul>
            </div>
        </div>
        <div class="snap-drawer snap-drawer-right"></div>
    </div>
    <div id="page" class="hfeed site">

        <header class="site-header headroom headroom--not-top headroom--unpinned">
            <div class="row middle-xs middle-sm">
                <div class="col-md-2 col-xs-10 site-branding">
                    <a title="<?php bloginfo('name');?>" href="<?php echo home_url();?>" rel="home"><img src="<?php bloginfo('template_url')?>/img/logo.svg" alt="Zebre"></a>
                </div>
                <div class="col-xs-2 hidden-md hidden-lg end">
                    <i id="open-left" class="iconfont">&#xe620;</i>
                </div>
                <div class="col-md-10 hidden-xs hidden-sm">
                    <div class="site-top pull-right">
                        <div class="row middle">
                            <nav id="site-navigation" class="main-navigation hidden-xs hidden-sm">
                                <div class="primary-menu">
                                    <ul class="menu">
                                        <?php wp_nav_menu( array( 'theme_location' => 'angela', 'container' => false ) ); ?>
                                    </ul>
                                </div>
                            </nav>
                            <!-- #site-navigation -->
                            <div class="search-box">
                                <form method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
                                    <label>
                                        <span class="screen-reader-text">Search for:</span>
                                        <input class="search-field" placeholder="输出关键词并按回车键搜索 …" name="s" title="Search for:" type="search">
                                    </label>
                                    <input class="search-submit" value="Search" type="submit">
                                </form><i class="iconfont">&#xe60a;</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
<?php get_header();?>
        <div id="content" class="site-content">
            <div class="big-title big-title--page" style="background-image: url('<?php bloginfo('template_url')?>/img/page_background.jpg')">
                <div style="transform: translateZ(0);" class="container contain-entry-title">
                    <h1 class="entry-title">ONE 优雅的wordpress主题</h1> <span class="entry-desc">theme by &amp; 主题笔记</span>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="content">
                            <article id="post-5">
                                <div class="entry-content">
                                    <div class="vc_row wpb_row vc_row-fluid cl-center">
                                        <div class="wpb_column vc_column_container vc_col-sm-9 vc_col-lg-offset-9 vc_col-md-offset-12">
                                            <div class="wpb_wrapper">
                                                <?php if(have_posts()) : ?>
	                                            <?php while(have_posts()) : the_post();?>
                                                <?php get_template_part( 'content' );?>
                                                <?php endwhile;?>
				                                <?php endif;?>
												<?php  if ( $wp_query->max_num_pages > 1 ) : ?>
                                                <div class="pagination loop-pagination">
                                                <?php pagenavi(); ?>
                                                </div>
												<?php endif; ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<?php get_footer();?>
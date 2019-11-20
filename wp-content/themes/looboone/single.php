<?php get_header();?>
          <div id="content" class="site-content">
		    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
               <div class="big-title big-title--single" style="background-image: url( <?php if( one_is_has_image() ) :?><?php echo get_post_thumbnail();?><?php else : ?>https://unsplash.it/1686/400?image=975&element=DIV<?php endif;?>)">
                <div class="container contain-entry-title">
                    <h1 class="entry-title"><?php the_title(); ?></h1>
                    <span class="entry-desc">J<?php echo date('M',get_the_time('U'));?>   <?php echo get_the_date('d,Y'); ?></span> 
                </div>
            </div>
			<?php endwhile; endif;?>
            <div class="container">
                <div class="row">
                    <div class="col-md-9">
                        <div class="content">
                           <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                            <article id="post-33" class="post-33 post type-post status-publish format-standard has-post-thumbnail hentry category-news tag-inspiration tag-news">
                                <div class="entry-content">
                                    <div class="entry-content">
										<?php the_content(); ?>
                                    </div>
                                    <div class="tags">
									    标签:<?php the_tags('',' ',''); ?>
                                         </div>
                                    <div class="entry-footer">
                                        <div class="row middle">
                                            <div class="col-xs-6">
                                                <div class="entry-meta">
                                                    <span class="comments-counts"><i class="iconfont">&#xe604;</i><?php if ( comments_open() ) : ?><?php comments_number('No comment', '1 comment', '% comment'); ?><?php endif;?></span>
                                                </div>
                                            </div>
											<div class="col-xs-6">
												<div class="share share-icons" data-title="<?php the_title(); ?>" data-url="<?php the_permalink() ?>" data-thumb="<?php echo get_post_thumbnail();?>">
                                                   <span class="icon-wechat" data-type="wechat"></span>
                                                   <span class="icon-sina-weibo" data-type="weibo"></span>
												   <span class="icon-tweibo" data-type="tweibo"></span>
												   <span class="icon-qzone" data-type="qzone"></span>
												   <span class="icon-qq" data-type="qq"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
									<?php
                //if ( comments_open() || get_comments_number() ) :
                   // comments_template();
                //endif;
                ?>
                                </div>
                            </article><?php endwhile; endif;?>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <aside class="sidebar">
                            <aside id="text-2" class="widget widget_text">
                                <h5 class="widget-title">关于</h5>
                                <div class="textwidget">
                                    <p><?php if($curauth->description){ echo $curauth->description; }else{ echo '人生若只如初见，只一眼，便是春风十里，初心，若雪，最纯也最真，最初的心，总能弹奏出最美的音符。';}?>
									</p>
                                </div>
                            </aside>
                        </aside>
                    </div>
                </div>
            </div>

        </div>
<?php get_footer();?>
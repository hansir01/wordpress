<article id="post-<?php echo $post->ID?>" class="post type-post status-publish format-standard has-post-thumbnail hentry category-news">
    <header class="entry-header">
        <h3 class="entry-title"><a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a></h3> 
	</header>
            <div class="dates"><?php echo date('M',get_the_time('U'));?>,<?php echo get_the_date('d,Y'); ?></div>
                
				<div class="post-thumb">
				  <?php if( one_is_has_image() ) :?>
                    <img src="<?php echo get_post_thumbnail();?>" class="attachment-full wp-post-image" alt="<?php the_title(); ?>" height="582" width="870">
				  <?php else : ?>
				    <img src="https://unsplash.it/406/306/?random" class="attachment-full wp-post-image" alt="<?php the_title(); ?>" height="582" width="870">
                  <?php endif;?>					
				</div>
				
                <div class="entry-content">
                    <p><?php echo mb_strimwidth(strip_tags(apply_filters('the_content', $post->post_content)), 0, 280,"……"); ?></p>
                </div>
                <div class="read-more-contain">
                     <button><a href="<?php the_permalink() ?>">阅读更多</a></button>
                </div>
                <div class="entry-footer">
                    <div class="row middle">
                        <div class="col-xs-6">
                            <div class="entry-meta">
                                <span class="comments-counts"><i class="iconfont">&#xe604;</i><?php if ( comments_open() ) : ?><?php comments_number('No comment', '1 comment', '% comment'); ?><?php endif;?></span>
                            </div>
                        </div>
                    <div class="col-xs-6 end">
                        <div class="share share-icons" data-title="<?php the_title(); ?>" data-url="<?php the_permalink() ?>">
                            <span class="icon-wechat" data-type="wechat"></span>
                            <span class="icon-sina-weibo" data-type="weibo"></span>
							<span class="icon-qzone" data-type="qzone"></span>
							<span class="icon-qq" data-type="qq"></span>
                          </div>
                        </div>
                     </div>
                </div>
</article>
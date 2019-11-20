<?php 
function pure_setup() {
    register_nav_menu( 'angela', '主题菜单' );
	register_nav_menu( 'mobile', '手机菜单' );
}
add_action( 'after_setup_theme', 'pure_setup' );
function get_ssl_avatar($avatar) {
    $avatar = str_replace(array("www.gravatar.com", "0.gravatar.com", "1.gravatar.com", "2.gravatar.com"), "cn.gravatar.com", $avatar);
    return $avatar;
}
add_filter('get_avatar', 'get_ssl_avatar');
add_theme_support( 'post-thumbnails' );
function one_is_has_image(){
    global $post;
    if( has_post_thumbnail() ) return true;
    $content = $post->post_content;
    preg_match_all('/<img.*?(?: |\\t|\\r|\\n)?src=[\'"]?(.+?)[\'"]?(?:(?: |\\t|\\r|\\n)+.*?)?>/sim', $content, $strResult, PREG_PATTERN_ORDER);
    if(!empty($strResult[1])) return true;
    return false;
}
function get_post_thumbnail(){
    global $post;
    if( has_post_thumbnail() ){
        $timthumb_src = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID),'full');
        return $timthumb_src[0];
    } else {
        $content = $post->post_content;
        preg_match_all('/<img.*?(?: |\\t|\\r|\\n)?src=[\'"]?(.+?)[\'"]?(?:(?: |\\t|\\r|\\n)+.*?)?>/sim', $content, $strResult, PREG_PATTERN_ORDER);
        $n = count($strResult[1]);
        if ($n > 0) {
            return $strResult[1][0];
        } else {
            return false;
        }
    }
}
function pagenavi( $p = 2 ) {
  if ( is_singular() ) return;
  global $wp_query, $paged;
  $max_page = $wp_query->max_num_pages;
  if ( $max_page == 1 ) return;
  if ( empty( $paged ) ) $paged = 1;
echo "<div id=\"pagenavi\">\n";
  if ( $paged > $p + 1 ) p_link( 1, '最前页' );
  if ( $paged > $p + 2 ) echo ' <span class="dots"> ... </span>';
  for( $i = $paged - $p; $i <= $paged + $p; $i++ ) {
    if ( $i > 0 && $i <= $max_page ) $i == $paged ? print "<a class='page-numbers current'>{$i}</a> " : p_link( $i );
  }
  if ( $paged < $max_page - $p - 1 ) echo ' <span class="dots"> ... </span>';
  if ( $paged < $max_page - $p ) p_link( $max_page, '最后页' );
echo "</div>\n";
}
function p_link( $i, $title = '' ) {
  if ( $title == '' ) $title = "第 {$i} 页";
  echo "<a class='page-numbers' href='", esc_html( get_pagenum_link( $i ) ), "' title='{$title}'>{$i}</a> ";
}
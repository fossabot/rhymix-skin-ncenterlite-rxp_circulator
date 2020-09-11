<?php
  class circulatorCustomFunction {
    public function reformatDate($regdate) {
      $diff = strtotime(date('YmdHis')) - strtotime($regdate);
      if ($diff/60/60/24 < 1) {
        if ($diff/60/60 < 1) {
            if (($diff/60)%60 < 1) {
              if ($diff%60 == 0) {
                return $rdate = '방금 전';
              } else {
                return $rdate = $diff%60 . ' 초 전';
              }
            } else {
              return $rdate = ($diff/60)%60 . ' 분 전';
            }
        } else {
          return $rdate = floor($diff/60/60) . ' 시간 전';
        }
      } elseif ($diff/60/60/24 >= 1 && $diff/60/60/24 <= 30) {
          return $rdate = floor($diff/60/60/24) . ' 일 전';
      } else {
          return $rdate = zdate($regdate, 'Y.m.d');
      }
    }

    public function autoHyperlink($str, $attributes = array())
    {
      $attrs = '';
      foreach ($attributes as $attribute => $value) {
          $attrs .= " {$attribute}=\"{$value}\"";
      }
      $str = ' ' . $str;
      $str = preg_replace(
          '@([^"=\'>])(((http|https|ftp)://|www.)[^\s<]+[^\s<\.)])@i',
          '$1<a class="hyperlink" href="$2"'.$attrs.'>[$2]</a>',
          $str
      );
      $str = substr($str, 1);
      $str = preg_replace('`href=\"www`', 'href="http://www', $str);
      // fÃ¼gt http:// hinzu, wenn nicht vorhanden
      return $str;
    }
  }
?>
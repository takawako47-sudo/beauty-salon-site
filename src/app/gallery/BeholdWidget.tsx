'use client';

import Script from 'next/script';

export default function BeholdWidget() {
  // TypeScriptのJSX型エラー（カスタムWebコンポーネント 'behold-widget' の未定義エラー）を
  // 回避するために 'behold-widget' を any にキャストして使用します。
  const BeholdWidgetElement = 'behold-widget' as any;

  return (
    <>
      <BeholdWidgetElement feed-id="k3VdDpX7viu3CuJXZoe0" />
      <Script
        id="behold-widget-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(() => {
            const d=document,s=d.createElement("script");s.type="module";
            s.src="https://w.behold.so/widget.js";d.head.append(s);
          })();`
        }}
      />
    </>
  );
}

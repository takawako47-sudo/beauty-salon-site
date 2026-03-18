"use client";

import React from "react";

// Google Calendar Embed Iframe
export default function ReservationSystem() {
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <h1 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "#333", textAlign: "center" }}>予約状況（空き状況）</h1>

            <p style={{ textAlign: "center", marginBottom: "30px", fontSize: "0.95rem", color: "#666" }}>
                以下のカレンダーから空き状況や定休日をご確認いただけます。<br />
                ご予約やお問い合わせはLINEからお願いいたします。
            </p>

            {/* ① Googleカレンダー デフォルト埋め込み */}
            <div style={{ position: "relative", paddingBottom: "75%", height: 0, overflow: "hidden", borderRadius: "8px", border: "1px solid #eee" }}>
                <iframe
                    src="https://calendar.google.com/calendar/embed?src=takawako47%40gmail.com&ctz=Asia%2FTokyo&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&mode=MONTH"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                    title="予約状況カレンダー"
                ></iframe>
            </div>

            {/* ② SNS & 予約相談セクション */}
            <div style={{
                marginTop: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>
                {/* LINE ボタン */}
                <a
                    href="https://line.me/ti/p/W_VCXFY3ou"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                        padding: "18px",
                        backgroundColor: "#06C755", // LINE公式カラー
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        boxShadow: "0 4px 6px rgba(6, 199, 85, 0.2)"
                    }}
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.551 8.865 8.423 9.61.328.07.758.21.865.498.098.26.064.67.031.956-.03.264-.202 1.258-.246 1.488-.056.284-.265 1.096.96.58 1.225-.515 6.6-3.877 8.973-6.634C22.697 14.594 24 12.565 24 10.304zM7.221 12.064H5.068V8.125h2.153v3.939zm2.405 0H7.47v-3.94h2.156v3.94zm5.065-2.613h-1.637v1.272h1.637v1.34H9.682V8.125h3.009v1.326zm5.122 2.613h-2.156l-1.353-2.093v2.093h-1.87v-3.94h2.15l1.36 2.062V8.125h1.869v3.939z" />
                    </svg>
                    LINEで予約・相談する
                </a>

                {/* Instagram ボタン */}
                <a
                    href="https://www.instagram.com/biyousitu_skip/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                        padding: "18px",
                        background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", // インスタグラデーション
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        boxShadow: "0 4px 6px rgba(220, 39, 67, 0.2)"
                    }}
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    Instagramでスタイルを見る
                </a>
            </div>
        </div>
    );
}

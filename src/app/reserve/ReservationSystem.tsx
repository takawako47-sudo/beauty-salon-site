"use client";

import { useState } from "react";
import { getAvailabilitySlots, AvailabilitySlot, CalendarEvent } from "@/lib/calendar";

interface ReservationSystemProps {
    initialEvents: CalendarEvent[];
}

export default function ReservationSystem({ initialEvents }: ReservationSystemProps) {
    // 日付のみを管理するため、時刻を00:00:00に固定したDateオブジェクトを使用
    const getStartOfDay = (date: Date) => {
        const d = new Date(date.getTime());
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const [selectedDate, setSelectedDate] = useState<Date>(getStartOfDay(new Date()));
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

    // 本日〜14日間
    const today = getStartOfDay(new Date());
    const dateList = Array.from({ length: 14 }, (_, i) => {
        const d = new Date(today.getTime());
        d.setDate(d.getDate() + i);
        return d;
    });

    // 選択された日付のスロットを生成
    const slots = getAvailabilitySlots(initialEvents, selectedDate);

    // フィルタリング
    const filteredSlots = showOnlyAvailable
        ? slots.filter(s => s.status === 'available')
        : slots;

    const formatDate = (date: Date) => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
        return `${month}/${day}(${dayOfWeek})`;
    };

    const isSameDate = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    };

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
            <h1 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "#333" }}>予約状況（空き状況）</h1>
            {/* デバッグ用: イベントが正しく取得できているか確認 */}
            <p style={{ fontSize: "0.8rem", color: "#ccc", marginBottom: "10px" }}>
                Debug: 加算されたイベント数 {initialEvents.length}
            </p>

            {/* 日付選択タブ */}
            <div style={{
                display: "flex",
                overflowX: "auto",
                gap: "10px",
                marginBottom: "30px",
                paddingBottom: "10px",
                borderBottom: "1px solid #eee",
                WebkitOverflowScrolling: "touch"
            }}>
                {dateList.map((date, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedDate(date)}
                        style={{
                            padding: "10px 15px",
                            borderRadius: "20px",
                            border: "1px solid",
                            borderColor: isSameDate(date, selectedDate) ? "#d4a373" : "#eee",
                            backgroundColor: isSameDate(date, selectedDate) ? "#d4a373" : "#fff",
                            color: isSameDate(date, selectedDate) ? "#fff" : "#666",
                            whiteSpace: "nowrap",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            fontWeight: isSameDate(date, selectedDate) ? "bold" : "normal"
                        }}
                    >
                        {formatDate(date)}
                    </button>
                ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <p style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#444" }}>
                    {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日の状況
                </p>
                <label style={{ fontSize: "0.9rem", color: "#666", cursor: "pointer", display: "flex", alignItems: "center" }}>
                    <input
                        type="checkbox"
                        checked={showOnlyAvailable}
                        onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                        style={{ marginRight: "5px" }}
                    />
                    空きのみ表示
                </label>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot) => (
                        <div
                            key={slot.time}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "15px 20px",
                                borderRadius: "8px",
                                border: "1px solid #eee",
                                backgroundColor:
                                    slot.status === "available"
                                        ? "#effaf3" // 薄い緑
                                        : slot.status === "holiday"
                                            ? "#fffaf0" // ベージュ
                                            : slot.status === "full"
                                                ? "#fff5f5" // 薄い赤
                                                : "#f5f5f5" // グレー
                            }}
                        >
                            <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#444" }}>
                                {slot.time}
                            </span>

                            <span
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    color:
                                        slot.status === "available"
                                            ? "#2f855a"
                                            : slot.status === "holiday"
                                                ? "#c05621"
                                                : slot.status === "full"
                                                    ? "#c53030"
                                                    : "#999"
                                }}
                            >
                                {slot.label}
                            </span>
                        </div>
                    ))
                ) : (
                    <p style={{ padding: "40px", color: "#999" }}>表示できる予約枠がありません。</p>
                )}
            </div>

            {/* ② Google口コミ誘導セクション */}
            <div style={{
                marginTop: "40px",
                padding: "30px 20px",
                backgroundColor: "#fffdf5", // 薄い黄色/ベージュ
                border: "1px solid #f0e6d2",
                borderRadius: "10px",
                textAlign: "center"
            }}>
                <p style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#666", marginBottom: "10px" }}>
                    本日はありがとうございました！励みになります
                </p>
                <div style={{ fontSize: "2.5rem", color: "#fbbc04", letterSpacing: "5px", marginBottom: "15px" }}>
                    ★★★★★
                </div>
                <a
                    href="https://search.google.com/local/writereview?placeid=ChIJfXJuPhedQDUROFgrawG275E"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-block",
                        padding: "15px 30px",
                        backgroundColor: "#fff",
                        color: "#333",
                        textDecoration: "none",
                        borderRadius: "30px",
                        fontWeight: "bold",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        border: "1px solid #eee",
                        fontSize: "1rem"
                    }}
                >
                    星だけでも励みになります！Google口コミを書く
                </a>
            </div>

            {/* ③ SNS & 予約相談セクション */}
            <div style={{
                marginTop: "30px",
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

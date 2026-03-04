"use client";

import { useState } from "react";
import { getAvailabilitySlots, AvailabilitySlot, CalendarEvent } from "@/lib/calendar";

interface ReservationSystemProps {
    initialEvents: CalendarEvent[];
}

export default function ReservationSystem({ initialEvents }: ReservationSystemProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

    // 本日〜14日間
    const today = new Date();
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

            <div style={{ marginTop: "40px", borderTop: "1px solid #eee", paddingTop: "20px", textAlign: "center" }}>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                    ご予約・お問合せはお電話にて承っております。
                </p>
                <a
                    href="tel:080-4474-5569"
                    style={{
                        display: "inline-block",
                        marginTop: "15px",
                        padding: "12px 25px",
                        backgroundColor: "#d4a373",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "30px",
                        fontWeight: "bold"
                    }}
                >
                    080-4474-5569 に電話する
                </a>
            </div>
        </div>
    );
}

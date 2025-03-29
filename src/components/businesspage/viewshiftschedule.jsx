import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

// Extend dayjs functionality
dayjs.extend(weekday);
dayjs.extend(localeData);

const ViewShiftSchedule = () => {
    const [currentMonth, setCurrentMonth] = useState(dayjs().month());
    const [currentYear, setCurrentYear] = useState(dayjs().year());
    const [shiftDates, setShiftDates] = useState(new Set());
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://localhost:7217/shifts')
            .then(response => response.json())
            .then(data => {
                if (data.isSuccess) {
                    const dates = new Set(data.result.map(shift => shift.shiftDate));
                    setShiftDates(dates);
                }
            })
            .catch(error => console.error('Error fetching shifts:', error));
    }, []);

    const daysInMonth = dayjs().year(currentYear).month(currentMonth).daysInMonth();
    const firstDayOfMonth = dayjs().year(currentYear).month(currentMonth).startOf('month').day();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handlePrevious = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNext = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleViewInfos = () => {
        navigate('/shifts');
    };

    return (
        <div className="p-8 max-w-8xl mx-auto border rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-3">
                <button onClick={handlePrevious} className="bg-green-500 text-white px-3 py-1 rounded">Previous</button>
                <h2 className="text-xl font-semibold">{dayjs().year(currentYear).month(currentMonth).format('MMMM YYYY')}</h2>
                <button onClick={handleNext} className="bg-green-500 text-white px-3 py-1 rounded">Next</button>
            </div>
            
            <div className="grid grid-cols-7 text-center font-semibold gap-2 mb-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <div key={day} className="p-3 border bg-gray-200 text-black  min-h-[70px]">{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {Array(firstDayOfMonth).fill(null).map((_, index) => (
                    <div key={`empty-${index}`} className="p-4"></div>
                ))}
                {daysArray.map(day => {
                    const formattedDate = dayjs().year(currentYear).month(currentMonth).date(day).format('YYYY-MM-DD');
                    return (
                        <div key={day} className="p-4 border text-center min-h-[70px] relative">
                            {day}
                            {shiftDates.has(formattedDate) && (
                                <button 
                                    onClick={handleViewInfos} 
                                    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 text-sm rounded"
                                >
                                    View infos
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ViewShiftSchedule;
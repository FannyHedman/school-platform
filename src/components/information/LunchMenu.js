import React, { useState, useEffect } from 'react';
import { useLanguage } from '../language/LanguageContext';
import en from '../language/languages/EN.json';
import se from '../language/languages/SE.json';
import { fetchMeals } from '../../apiService';

const LunchMenu = () => {
    const { language } = useLanguage();
    const lang = language === 'se' ? se : en;

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMealsData = async () => {
            try {
                const mealsData = await fetchMeals();
                setMeals(mealsData.meals); 
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };
        fetchMealsData();
    }, []);

        const mapDayIdToName = (dayId) => {
          switch (dayId) {
              case 1:
                  return lang.monday;
              case 2:
                  return lang.tuesday;
              case 3:
                  return lang.wednesday;
              case 4:
                  return lang.thursday;
              case 5:
                  return lang.friday;
              default:
                  return '';
          }
      };

    return (
        <div style={{ marginTop: '200px' }}>
            <h2>{lang.weeklyLunchMenu}</h2>
            <ul>
                {meals.map((meal, index) => (
                    <li key={index}>
                        <p>{`${mapDayIdToName(meal.day)}: ${meal.lunch}`}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LunchMenu;

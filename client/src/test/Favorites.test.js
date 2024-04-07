import React from 'react';
import { render } from '@testing-library/react';
import Favorites from '../pages/favorites/Favorites';
import { useProductContext } from '../components/ProductContext';
import { ProductProvider } from '../components/ProductContext';

jest.mock('../components/ProductContext');

describe('Favorites Component', () => {
    test('renders "No Item Found" message when favorites is empty', () => {
        useProductContext.mockReturnValue({ favorites: [] });
        const { getByText } = render(<Favorites />);
        expect(getByText('No Item Found')).toBeInTheDocument();
    });

    test('renders product items when favorites is not empty', () => {

        const favoriteProds = [
            {
                "product_id": 2,
                "name": "boxing bag",
                "details": "The perfect heavy bag for combat sports practitioners, this bag is constructed of a durable black vinyl shell, heavy-duty chains, web straps, and filled with fibers. 70 lbs. - 13\"\" Diameter x 40\"\" Tall / 100 lbs. - 13\"\" Diameter x 42\"\" Tal. A quick way calculate what heavy bag is best for you is take your weight, divide by two, and round up to the nearest heavy bag weight. Oversized shipping rates apply.\n",
                "howToUse": "Safety first:\n\nMake sure the area around the bag is clear of any obstacles.\nUse hand wraps and gloves to protect your hands and wrists.\nWarm up your body with some light exercises before starting.\nProper stance:\n\nStand with your feet shoulder-width apart.\nDistribute your weight evenly on both legs.\nKeep your knees slightly bent for better mobility and shock absorption.\nHand positioning:\n\nIf you are right-handed, your left hand should be closer to the bag, and vice versa for left-handed individuals.\nHold your hands up in a defensive position, with your elbows close to your body.\nBasic punches:\n\nJab: Extend your lead hand (left for right-handed, right for left-handed) straight out, then quickly retract it.\nCross: Pivot on your back foot as you throw a straight punch with your rear hand.\nHook: Bend your elbow at a 90-degree angle and swing your lead hand horizontally to the side.\nUppercut: Bend your knees slightly and drive your rear hand upward in an arc motion.\nCombination drills:\n\nPractice combining different punches into fluid combinations.\nStart with simple combinations and gradually increase complexity as you become more comfortable.\nFootwork:\n\nMove around the bag using lateral and forward/backward movements.\nPractice circling the bag to work on angles and defensive footwork.\nDefense:\n\nIncorporate head movement, slips, and rolls into your routine to simulate real boxing scenarios.\nUse the bag to practice blocking and parrying punches.\nIntensity and timing:\n\nVary your punching speed and power to simulate different scenarios.\nFocus on timing your punches and maintaining control.\nCardio and conditioning:\n\nUse the bag for high-intensity interval training (HIIT) to improve cardiovascular endurance.\nMix in bodyweight exercises between rounds for a full-body workout.\nCool down:\n\nAfter your session, cool down with stretching to improve flexibility and reduce muscle soreness.",
                "image": "https://media-www.canadiantire.ca/product/playing/exercise/exercise-accessories/0845907/everlast-70lb-everstrike-heavy-bag-53c27fb2-8f95-4ceb-9b0e-6d1fc8efc7cd-jpgrendition.jpg?imdensity=1&imwidth=1244&impolicy=gZoom",
                "price": "200.00",
                "brand": "century",
                "retailer": "northern fitness",
                "favorite": true
            },
            {
                "product_id": 1,
                "name": "Rubber Hex Dumbbells 10lb",
                "details": "Dumbell featuring a  chrome-finished contoured ergonomic handle with knurlings for an optimal grip.\nThe hexagonal shape prevents rolling, ensuring a stable and safe workout environment. \nThe rubber coating minimizes noise, protects flooring, and extends the life of the dumbbells, making them a smart investment for any fitness enthusiast.\n",
                "howToUse": "Selecting the Right Weight:\n\nStart with a weight that challenges you but allows you to maintain proper form.\nIf you are unsure about the right weight, begin with a lighter one and gradually increase as you get stronger.\nWarm-Up:\n\nAlways start your workout with a proper warm-up to prepare your muscles for exercise. This can include light cardio, dynamic stretching, or mobility exercises.\nProper Grip:\n\nHold one dumbbell in each hand using a firm, comfortable grip.\nThe rubber hex shape provides stability and prevents the dumbbells from rolling when placed on the floor.\nCorrect Form:\n\nPerform exercises with proper form to maximize effectiveness and minimize the risk of injury.\nKeep your back straight, shoulders back, and engage your core during exercises.\nCommon Exercises:\n\nBicep Curls: Stand with feet shoulder-width apart, arms fully extended. Curl the dumbbells toward your shoulders, keeping your elbows close to your body.\nShoulder Press: Sit or stand with dumbbells at shoulder height. Press the weights overhead, fully extending your arms.\nLunges or Squats: Hold dumbbells at your sides or shoulders while performing lunges or squats to add resistance.\nRows: Bend at the hips with a flat back, holding dumbbells in each hand. Pull the weights toward your chest in a rowing motion.\nSets and Repetitions:\n\nStructure your workout with a specific number of sets and repetitions based on your fitness goals.\nFor strength, aim for fewer reps (around 6-8) with heavier weights. For endurance, use lighter weights with more reps (around 12-15).\nRest Between Sets:\n\nAllow your muscles to recover by taking appropriate rest periods between sets (typically 30 seconds to 2 minutes, depending on your goal).\nCool Down:\n\nFinish your workout with a proper cool-down, including static stretches for the muscles you worked.\nSafety Precautions:\n\nPay attention to your body and stop exercising if you feel pain beyond normal muscle fatigue.\nUse proper footwear and workout on a stable surface to prevent accidents.\nMaintenance:\n\nPeriodically check the rubber coating for any signs of damage. If you notice any issues, consider replacing the dumbbell to ensure safety.",
                "image": "https://media-www.canadiantire.ca/product/playing/exercise/exercise-accessories/1841075/ziva-performance-hexagon-steel-dumbbell-15lb-313404c0-20b7-489d-bf32-05c6ab6efecf-jpgrendition.jpg?imdensity=1&imwidth=1244&impolicy=gZoom",
                "price": "12.00",
                "brand": "orion",
                "retailer": "northern fitness",
                "favorite": true
            }
        ];

        localStorage.setItem('favorites', JSON.stringify(favoriteProds));

        useProductContext.mockReturnValue({ favorites: favoriteProds });

        const { getByText } = render(
            <ProductProvider>
                <Favorites />
            </ProductProvider>
        );

        expect(localStorage.getItem('favorites')).toBeTruthy();
    });
});

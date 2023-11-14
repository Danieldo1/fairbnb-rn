import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Ionicons,MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';

const categories = [
    {
      name: 'Tiny Homes',
      icon: 'home',
    },
    {
      name: 'Cabins',
      icon: 'house-siding',
    },
    {
      name: 'Trending',
      icon: 'local-fire-department',
    },
    {
      name: 'Play',
      icon: 'videogame-asset',
    },
    {
      name: 'City',
      icon: 'apartment',
    },
    {
      name: 'Beachfront',
      icon: 'beach-access',
    },
    {
      name: 'Countryside',
      icon: 'nature-people',
    },
  ];
  
interface Props {
    onCategoryChange: (category: string) => void;
}

const ExploreHeader = ({onCategoryChange}: Props ) => {
    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<ScrollView>(null);

    const selectedCategory =  (index: number) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index)

        selected?.measure((x) => {
            scrollRef.current?.scrollTo({
                x: x-84, y:0, animated: true
            })
        })
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onCategoryChange(categories[index].name)
    }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.box}>
        <View style={styles.action}>
            <Link href={'/(modals)/booking'} asChild>
                <TouchableOpacity style={styles.searchBtn}>
                    <MaterialIcons name='search' size={24} />
                    <View>
                        <Text style={{fontFamily: 'mon-sb'}}>Where to?</Text>
                        <Text style={{fontFamily: 'mon', color: '#636262'}}>Anywhere · Any Week</Text>
                    </View>
                </TouchableOpacity>
            </Link>

            <TouchableOpacity style={styles.filterBtn}>
                <Ionicons name='options' size={24} />
            </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} 
        ref={scrollRef}
        contentContainerStyle={{alignItems: 'center', gap: 30, paddingHorizontal: 16}}
        >
            {categories.map((category, index) => (
                <TouchableOpacity key={index} ref={(el) => itemsRef.current[index] = el} onPress={() => selectedCategory(index)} style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}>
                    <MaterialIcons name={category.icon as any} size={24} color={activeIndex === index ? '#000' : '#ababab'} />
                    <Text style={{...styles.categoryTxt, color: activeIndex === index ? '#000' : '#ababab'}}>{category.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    categoryTxt:{
        fontFamily: 'mon-sb',
        fontSize: 14,
        color: '#636262'
    },
    categoryTxtAct:{
        fontFamily: 'mon-sb',
        fontSize: 14,
        color: '#000'
    },
    categoriesBtn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 8,
    },
    categoriesBtnActive: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: '#000',
      borderBottomWidth: 2,
      paddingBottom: 8,
    },
    searchBtn:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderColor: '#ababab',
        borderWidth: StyleSheet.hairlineWidth,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        flex: 1,
        borderRadius: 24,
        backgroundColor: '#fff',
        padding: 12
    },
    box: {
        backgroundColor: '#fff',
        height: 150,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: {
          width: 1,
          height: 10,
    },
    padding: 5
},
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
        gap: 8
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ababab',
        borderRadius: 24,
        
    }
})


export default ExploreHeader
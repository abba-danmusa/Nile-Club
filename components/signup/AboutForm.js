import { View, Text, StyleSheet, Dimensions, ScrollView, Platform } from 'react-native'
import React, {useState} from 'react'
import CustomizedInput from '../CustomizedInput'
import Dropdown from '../Dropdown'
import { Button } from '@rneui/themed'
import { useAuthStore } from '../../hooks/stores/useAuthStore'
import { AntDesign } from '@expo/vector-icons'
import { useAbout } from '../../hooks/queries/useAuthentication'
import Loader from '../Loader'
import SuccessScreen from '../SuccessScreen'
import { router } from "expo-router"
import Toast from '../../utils/toast'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height
const FACULTIES = [
  { key: 1, value: 'Faculty of Computer Science and Engineering' },
  { key: 2, value: 'Faculty of Engineering' },
  { key: 3, value: 'Faculty of Information Technology' },
  { key: 4, value: 'Faculty of Mathematics and Computer Science' },
  { key: 5, value: 'Faculty of Science' },
  { key: 6, value: 'Faculty of Social Sciences and Humanities' },
  { key: 7, value: 'Faculty of Arts and Humanities' },
  { key: 8, value: 'Faculty of Business' },
  { key: 9, value: 'Faculty of Education' },
  { key: 10, value: 'Faculty of Health' },
]
const DEPARTMENTS = [
  "B.Eng Information and Communication Engineering",
  "BEng Chemical Engineering",
  "BEng Civil Engineering",
  "BEng Computer Engineering",
  "BEng Electrical & Electronics Engineering",
  "BEng Mechanical Engineering",
  "BEng Mechatronics Engineering",
  "BEng Petroleum & Gas Engineering",
  "B.Sc. Building",
  "B.Sc. Data Science",
  "B.Sc. Entrepreneurship",
  "B.Sc. Information System",
  "B.Sc. Peace Studies and Conflict Resolution",
  "B.Sc. Science Laboratory Technology",
  "BSc Accounting",
  "BSc Architecture",
  "BSc Banking and Finance",
  "BSc Biochemistry",
  "BSc Banking and Finance",
  "BSc Biotechnology",
  "BSc Business Administration",
  "BSc Computer Science",
  "BSc Cyber Security",
  "BSc Economics",
  "BSc Human Anatomy",
  "BSc Information Technology",
  "BSc Marketing",
  "BSc Software Engineering",
  "LLB Law",
  "MBBS Medicine",

]
const LEVELS = [
  { key: 1, value: '100 Level' },
  { key: 2, value: '200 Level' },
  { key: 3, value: '300 Level' },
  { key: 4, value: '400 Level' },
  { key: 5, value: '500 Level' },
  { key: 6, value: '600 Level' }
]

export default function AboutForm({ scrollToScreen, editProfile = () => { }, edit = false }) {
  
  const {
    firstName,
    lastName,
    faculty,
    department,
    year,
    email,
    matriculationNumber,
    setMatriculationNumber,
    setFirstName,
    setLastName,
    setFaculty,
    setDepartment,
    setYear
  } = useAuthStore()

  const { mutate: sendAbout, isPending, isSuccess } = useAbout()

  const [onFacultySelected, setOnFacultySelected] = useState(false)
  const [onDepartmentSelected, setOnDepartmentSelected] = useState(false)
  const [onYearSelected, setOnYearSelected] = useState(false)

  const onSelected = (dropdown) => {
    switch (dropdown) {
      case 'faculty':
        setOnFacultySelected(true)
        break
      case 'department':
        setOnDepartmentSelected(true)
      case 'year':
        setOnYearSelected(true)
        break
      default:
        break
    }
  }

  const DROPDOWNS = [
    {
      data: FACULTIES,
      setSelected: setFaculty,
      searchPlaceholder: 'Please choose your faculty',
      placeholder: 'Please choose your faculty',
      placeholderTitle: 'Faculty of Study',
      onSelect: 'faculty',
      arrowicon: onFacultySelected ?
        <AntDesign name = "checkcircle" size = { 20 } color = "#365486" />
        : null
    },
    {
      data: DEPARTMENTS,
      setSelected:  setDepartment ,
      searchPlaceholder: 'Please choose your department',
      placeholder: 'Please choose your department',
      placeholderTitle: 'Department of Study',
      onSelect: 'department',
      arrowicon: onDepartmentSelected ?
        <AntDesign name = "checkcircle" size = { 20 } color = "#365486" />
        : null
    },
    {
      data: LEVELS,
      setSelected:  setYear ,
      searchPlaceholder: 'Please choose what level/year you’re currently in',
      placeholder: 'Please choose what level/year you’re currently in',
      placeholderTitle: 'Year of Study',
      onSelect: 'year',
      arrowicon: onYearSelected ?
        <AntDesign name = "checkcircle" size = { 20 } color = "#365486" />
        : null
    }
  ]
  const INPUTS = [
    {
      label: 'First Name',
      value: firstName,
      onChangeText: setFirstName,
      placeholder: 'Enter your first name',
      autoCapitalize: 'words',
      autoComplete: 'given-name',
    },
    {
      label: 'Last Name',
      value: lastName, 
      onChangeText: setLastName,
      placeholder: 'Enter your last name',
      autoCapitalize: 'words',
      autoComplete: 'family-name',
    },
    {
      label: 'Matriculation Number',
      value: matriculationNumber,
      onChangeText: setMatriculationNumber,
      placeholder: 'Enter your matriculation number',
      autoCapitalize: 'none',
      autoComplete: 'one-time-code',
    }
  ]

  const createAbout = () => {
    if (
      !firstName || !lastName || !faculty || !department || !year ||!matriculationNumber
    ) return Toast('Please provide all information')

    if (edit) {
      editProfile({
        firstName,
        lastName,
        faculty,
        department,
        year,
        matriculationNumber
      })
      return
    }
    
    sendAbout({
      firstName,
      lastName,
      faculty,
      department,
      year,
      email,
      matriculationNumber
    }, {
      onSuccess: () => {

      }
    })
  }

  const onSubmit = () => router.replace('/signin')

  return (
    <>
      {/* Loader */}
      {isPending && <Loader />}

      {/* success screen */}
      {isSuccess &&
        <SuccessScreen
          title="Thank you!"
          description='You have successfully created your account. You’re now ready to explore clubs and activities'
          image={require('../../assets/signup/completion_mark.png')}
          onSubmit={onSubmit}
        />
      }

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <Text style={styles.title}>Tell us about yourself</Text>
        <Text style={styles.description}>
          Please provide us with the following info so we can personalize your experience
        </Text>

        {
          INPUTS.map((input, index) =>
            <CustomizedInput
              key={index}
              label={input.label}
              value={input.value}
              onChangeText={input.onChangeText}
              placeholder={input.placeholder}
              autoCapitalize={input.autoCapitalize}
              autoComplete={input.autoComplete}
            />
          )
        }

        {
          DROPDOWNS.map((dropdown, index) => 
            <Dropdown
              key={index}
              data={dropdown.data}
              setSelected={dropdown.setSelected}
              searchPlaceholder={dropdown.searchPlaceholder}
              placeholder={dropdown.placeholder}
              placeholderTitle={dropdown.placeholderTitle}
              search={false}
              onSelect={() => onSelected(dropdown.onSelect)}
              arrowicon={dropdown.arrowicon}
            />
          )
        }

        <Button
          title={edit ? 'Edit Profile' : 'Create account'}
          buttonStyle={{
            backgroundColor: '#365486',
            borderRadius: 12,
            marginVertical: 25
          }}
          onPress={createAbout}
        />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: DEVICE_WIDTH,
    // height: DEVICE_HEIGHT * 2,
    marginTop: 100,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 200
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 30,
    fontWeight: '400',
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Poppins',
    marginBottom: 30,
    alignSelf: 'flex-start',
    width: 300,
  },
})
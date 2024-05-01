import React from 'react'
import CommentItem from '../../components/club/CommentItem'
import CommentFooter from '../../components/club/CommentFooter'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useComments } from '../../hooks/queries/useClub'
import { StyleSheet, View } from 'react-native';
import { Skeleton } from '@rneui/base';

export default function CommentSheet({ bottomSheetRef, clubId }) {

  const {
    data: comments,
    refetch: refetchComments,
    isPending: isPendingComments
  } = useComments(clubId)

  const handleSheetChanges = index => {
    if (index === 0) bottomSheetRef.current.close()
  }
  const snapPoints = ['20%', "50%", '70%', '90%']

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      index={-1}
      enableDynamicSizing={true}
      snapPoints={snapPoints}
      handleHeight={50}
      containerHeight={500}
      // containerOffset={500}
      handleIndicatorStyle={{ backgroundColor: 'grey' }}
      footerComponent={(props) =>
        <CommentFooter {...props} clubId={clubId} />
      }
      backgroundStyle={{
        flex: 1,
        backgroundColor: 'black',
        shadowColor: 'black',
        shadowOffset: {
          width: 20, // No horizontal offset
          height: 15, // Vertical offset
        },
        shadowOpacity: 0.25, // Opacity of the shadow
        shadowRadius: 3.84, // Spread of the shadow
        elevation: 20, // Android elevation (affects shadow appearance)
        borderRadius: 20,
      }}
      style={{
        paddingHorizontal: 10,
        alignContent: 'flex-end'
      }}
    >
      <BottomSheetFlatList
        data={comments?.data?.comments}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) =>
          isPendingComments ? <LoadingState /> : <CommentItem comment={item}/>
        }
      // contentContainerStyle={{
      //   // flex: 1,
      //   // backgroundColor: 'red',
      // }}
      />
    </BottomSheet>
  )
}

const LoadingState = () => {
  return [1, 2, 3, 4, 5].map((_, index) =>
    <View key={index}>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <Skeleton width={45} height={45} circle animation='wave' />
        <View style={{ gap: 5 }}>
          <Skeleton width={150} height={15} animation='wave' />
          <Skeleton width={100} animation='wave' />
        </View>
      </View>
      <View style={{ marginLeft: 55, marginBottom: 20, gap: 5 }}>
        {
          [1, 2, 3, 4, 5].map((_, index) =>
            <Skeleton width={250} animation='wave' key={index} />
          )
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: '#EBEEF3',
    height: 50,
    width: 50,
    borderRadius: 100,
    borderColor: '#58719B',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
})
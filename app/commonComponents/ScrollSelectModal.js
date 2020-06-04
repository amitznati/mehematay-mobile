import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  VirtualizedList,
  View,
} from 'react-native';
import {Modal, Text} from '@ui-kitten/components';

const ITEM_HEIGHT = 50;
export default class ScrollSelectModal extends React.Component {
  constructor(props) {
    super(props);
    this.scrollView_ref = React.createRef();
  }

  scrollToIndex = () => {
    const ref = this.scrollView_ref.current;
    ref.scrollToIndex({
      index: this.props.defaultIndex - 3,
      animated: false,
    });
  };

  renderItem = ({item}) => {
    return (
      <View style={styles.itemWrap}>
        <TouchableOpacity
          key={item.id}
          onPress={() => this.props.onSelect(item)}>
          <Text style={styles.itemText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  getItem = (data, index) => {
    return {
      id: data[index].key,
      title: data[index].title,
    };
  };

  render() {
    const {data, closeModal, modalOpen, defaultIndex} = this.props;
    return (
      <Modal
        backdropStyle={styles.backdrop}
        onBackdropPress={closeModal}
        visible={modalOpen}>
        <SafeAreaView style={styles.modalContainer}>
          <VirtualizedList
            ref={this.scrollView_ref}
            onLayout={defaultIndex > 3 && this.scrollToIndex}
            data={data}
            initialNumToRender={10}
            renderItem={this.renderItem}
            keyExtractor={item => `${item.id}`}
            getItemCount={() => data.length}
            getItem={this.getItem}
            getItemLayout={(_data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
          />
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    width: 200,
    height: 350,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  backdrop: {
    backgroundColor: 'rgba(66,65,62,0.5)',
  },
  itemWrap: {
    height: ITEM_HEIGHT,
    width: 180,
    borderBottomWidth: 1,
    borderBottomColor: '#8E3032',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  itemText: {
    fontFamily: 'Assistant-Light',
    fontSize: 24,
    lineHeight: 30,
    color: '#8E3032',
  },
});

import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import EditIcon from '../../images/edit-white.png';
import FeedSample from '../components/feedSample';
import { Icon } from 'react-native-elements';
// import AddIcon from '../../images/add2x.png';
import MemberInfo from '../components/common/memberInfo';



class GoalLandingDetail extends Component {
    state={ detailData:[], feedDetail:[] }

   componentDidMount(){
        // axios.get(`http://10.10.80.237:8080/api/goal/${ this.props.navigation.state.params.itemId}`)
        // .then( res =>{
        //     this.setState({ detailData: res.data });
        //     console.log('showdetail', this.state.detailData);
        // }).catch(err => {
        //     console.log(err);
        // });
        this.fetchGoalDetail();
        this.fetchFeedDetail();
 }

    fetchGoalDetail = () => {
        axios
            .get(`http://10.10.80.237:8080/api/goal/${ this.props.navigation.state.params.itemId}`)
            .then(res => {console.log('res', res); this.setState({ detailData: res.data })})
            .catch(e => console.log(e));
    }

    fetchFeedDetail = () => {
        axios
            .get(`http://10.10.80.237:8080/api/feed/${ this.props.navigation.state.params.itemId}`)
            .then(res => {console.log('res2', res); this.setState({ feedDetail: res.data })})
            .catch(e => console.log(e));
    }
    
    render() {
        const { navigation, } = this.props;
    return (
        <View style={styles.containerStyle}>
            <View style={styles.headerStyle}>
                <Text style={styles.headingColor}>Test</Text>
                <View style={styles.editSectionStyle}>
                    <Text style={{ color: 'aqua' }} onPress={() => navigation.navigate('GoalDetails', { itemId: this.state.detailData._id })}>View Details</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateGoalPage', { itemId: this.state.detailData._id, goalDetails: this.state.detailData, edit: 'true' })}>
                    <Image source={EditIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.progressSection}>
                <Text>progress bar to be placed</Text>
                <View >
                    <Text style={styles.completionDateHeader}>Completed By</Text>
                    <Text style={styles.completionDateContainer}>{this.state.detailData && moment.utc(this.state.detailData.dueOn).format('MMM DD')}</Text>
                </View>
            </View>
            <View style={styles.upadatePostSec}>
                <Text>Post an update...</Text>
                {/* <Image style={styles.addPostStyle} source={AddIcon} /> */}
                <Icon name='md-add-circle-outline' type='ionicon' color='#00afff' />
             </View>  
        {(this.state.feedDetail.length) ? this.state.feedDetail.map(item => <FeedSample item={item} />) : <Text style={styles.noDataText}>No Feeds</Text>}
            
        </View>
    );
   }
}   
const styles = {


    containerStyle: {
        backgroundColor: '#eee',
        height: '100%',
    },
    headerStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#424372',
    },
    editSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    progressSection: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        backgroundColor: '#424372',
        opacity: 0.9,


    },
    completionDateContainer: {
        color: '#fff',
        fontWeight: '400',
        fontSize: 16,
    },
    completionDateHeader: {
        color: '#fff',
        fontSize: 10,
    },
    addMemberSec: {
        width: '100%',
        backgroundColor: '#ccc',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        flexDirection: 'row',

    },
    upadatePostSec: {
        backgroundColor: '#fff',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 3,
        paddingRight: 5,
        paddingLeft: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center',
    },
    headingColor: {
        color: '#fff'
    },
    noDataText: {
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        margingTop: 10,
        width: '89%',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    }

 };

export default GoalLandingDetail;

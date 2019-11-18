import React, { useState , useEffect  } from "react";
import { Card, Row, Col, Skeleton, Icon } from "antd";
import { TagSelect } from "ant-design-pro";
//import { connect } from "dva";
import { useSelector, useDispatch  } from "react-redux";
//import { createSelector } from "reselect";


// const namespace = "goods";

  
// export const DoneTodosCounter = () => {
//     const NumOfDoneTodos = useSelector(selectNumOfDoneTodos)
//     return <div>{NumOfDoneTodos}</div>
// }

// createSelector() 的作用是 
// const selectNumOfDoneTodos = createSelector(
//     state => state.goods.courses,   //将第一个的返回值 给第二个使用
//     courses => courses              // 这个值 处理之后是 最终的返回值
// )
  
// function Goods () {
//     const courses = useSelector(selectNumOfDoneTodos);
//     //const courses = useSelector(state => state.goods.courses);
//     console.log(courses);
//     return <div>
//         asd
//     </div>
// }



// 第一种方式 hooks 使用redux的方式
function Goods () {
    const [tags, setTags] = useState([]);
    const [displayCourses, setDisplayCourses] = useState(new Array(8).fill({}));


    const useTags = useSelector(state => state.goods.tags);
    const useCourses = useSelector(state => state.goods.courses);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "goods/getList" });
    }, []);


    useEffect(() => {
        if (useTags.length > 0) {
            tagSelectChange(useTags, useCourses)
        }
    }, [useTags]);

    function tagSelectChange (tags = useTags, courses = useCourses)  {
        // 过滤显示列表
        let displayCourses = [];
        tags.forEach(tag => {
            displayCourses = [...displayCourses, ...courses[tag]]
        });
        
        setDisplayCourses(() => displayCourses);
        setTags(() => tags);
    }

    function addCart(e, item) {
        e.stopPropagation();
        dispatch({ type: "cart/addCart", payload: item })
    };

    // 这个是 全局有一个dva 自带的loading 状态
    // if (props.loading.models.goods) {
    //     return <div>加载中...</div>
    // }
    return (
        <div>
            {/* 分类标签 */}
            <TagSelect onChange={tagSelectChange} value={tags}>
                {useTags.map(tag => {
                    return (
                        <TagSelect.Option key={tag} value={tag}>
                            {tag}
                        </TagSelect.Option>
                    );
                })}
            </TagSelect>
            {/* 商品列表 */}
            <Row type="flex" justify="start">
                {displayCourses.map((item, index) => {
                    return (
                        <Col key={index} style={{ padding: 10 }} span={6}>
                            {item.name ? (
                                <Card
                                    extra={
                                        <Icon onClick={e => addCart(e, item)}
                                            type="shopping-cart"
                                            style={{ fontSize: 18 }} />}
                                    hoverable
                                    title={item.name}
                                    cover={<img src={"/course/" + item.img} />}
                                >
                                    <Card.Meta
                                        description={
                                            <div>
                                                <span>￥{item.price}</span>
                                                <span style={{ float: "right" }}>
                                                    <Icon type="user" /> {item.solded}
                                                </span>
                                            </div>
                                        }
                                    />
                                    <div />
                                </Card>
                            ) : (
                                    <Skeleton active={true} />
                                )}
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default Goods;
  

//第二种方式 hooks和redux 以前版本的结合
// const namespace = "goods";

// const mapStateToProps = (state) => {
//     console.log(state);
// 	return {
//         loading: state.loading,
//         courses: state[namespace].courses,
//         tags: state[namespace].tags
// 	}
// }

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		onAddCart : (item) =>{
// 			dispatch({
//                 type: `cart/addCart`,
//                 payload: item
// 			})
//         },
//         onGetList : () =>{
// 			dispatch({
//                 type: `goods/getList`
// 			})
//         }
// 	}
// }

// function Goods (props) {
//     const [tags, setTags] = useState([]);
//     const [displayCourses, setDisplayCourses] = useState(new Array(8).fill({}));

//     useEffect(() => {
//         props.onGetList();
//     }, []);


//     useEffect(() => {
//         if (props.tags.length > 0) {
//             tagSelectChange(props.tags, props.courses)
//         }
//     }, [props]);

//     function tagSelectChange (tags, courses = props.courses)  {
//         // 过滤显示列表
//         let displayCourses = [];
//         tags.forEach(tag => {
//             displayCourses = [...displayCourses, ...courses[tag]]
//         });
        
//         setDisplayCourses(() => displayCourses);
//         setTags(() => tags);
//     }

//     function addCart(e, item) {
//         e.stopPropagation();
//         props.onAddCart(item);
//     };

//     // 这个是 全局有一个dva 自带的loading 状态
//     // if (props.loading.models.goods) {
//     //     return <div>加载中...</div>
//     // }
//     return (
//         <div>
//             {/* 分类标签 */}
//             <TagSelect onChange={tagSelectChange} value={tags}>
//                 {props.tags.map(tag => {
//                     return (
//                         <TagSelect.Option key={tag} value={tag}>
//                             {tag}
//                         </TagSelect.Option>
//                     );
//                 })}
//             </TagSelect>
//             {/* 商品列表 */}
//             <Row type="flex" justify="start">
//                 {displayCourses.map((item, index) => {
//                     return (
//                         <Col key={index} style={{ padding: 10 }} span={6}>
//                             {item.name ? (
//                                 <Card
//                                     extra={
//                                         <Icon onClick={e => addCart(e, item)}
//                                             type="shopping-cart"
//                                             style={{ fontSize: 18 }} />}
//                                     hoverable
//                                     title={item.name}
//                                     cover={<img src={"/course/" + item.img} />}
//                                 >
//                                     <Card.Meta
//                                         description={
//                                             <div>
//                                                 <span>￥{item.price}</span>
//                                                 <span style={{ float: "right" }}>
//                                                     <Icon type="user" /> {item.solded}
//                                                 </span>
//                                             </div>
//                                         }
//                                     />
//                                     <div />
//                                 </Card>
//                             ) : (
//                                     <Skeleton active={true} />
//                                 )}
//                         </Col>
//                     );
//                 })}
//             </Row>
//         </div>
//     );
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Goods)



// 第三种写法  class 使用注解的方式
//  @connect(
//     state => ({
//         courses: state.goods.courses,
//         tags: state.goods.tags,
//         // loading: state.loading
//     }),
//     {
//         addCart: item => ({ // 加购方法
//             type: "cart/addCart",
//             payload: item
//         }),
//         getList: () => ({
//             type: 'goods/getList'
//         })
//     }
// )
// class Goods extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             tags: [],// 默认未选中
//             displayCourses: new Array(8).fill({})  // 用于骨架屏展示
//         }
//     }

//     componentDidMount() {
//         this.props.getList();
//     }

//     componentWillReceiveProps(props) {
//         if (props.tags.length > 0) {
//             this.tagSelectChange(props.tags, props.courses)
//         }
//     }

//     tagSelectChange = (tags, courses = this.props.courses) => {
//         // 过滤显示列表
//         let displayCourses = [];
//         tags.forEach(tag => {
//             displayCourses = [...displayCourses, ...courses[tag]]
//         });
//         this.setState({ displayCourses, tags })
//     }

//     addCart = (e, item) => {
//         e.stopPropagation();
//         this.props.addCart(item);
//     };

//     render() {
//         // console.log(this.props.loading);
//         // if (this.props.loading.models.goods) {
//         //   return <div>加载中...</div>
//         // }
//         return (
//             <div>
//                 {/* 分类标签 */}
//                 <TagSelect onChange={this.tagSelectChange} value={this.state.tags}>
//                     {this.props.tags.map(tag => {
//                         return (
//                             <TagSelect.Option key={tag} value={tag}>
//                                 {tag}
//                             </TagSelect.Option>
//                         );
//                     })}
//                 </TagSelect>
//                 {/* 商品列表 */}
//                 <Row type="flex" justify="start">
//                     {this.state.displayCourses.map((item, index) => {
//                         return (
//                             <Col key={index} style={{ padding: 10 }} span={6}>
//                                 {item.name ? (
//                                     <Card
//                                         extra={
//                                             <Icon onClick={e => this.addCart(e, item)}
//                                                 type="shopping-cart"
//                                                 style={{ fontSize: 18 }} />}
//                                         hoverable
//                                         title={item.name}
//                                         cover={<img src={"/course/" + item.img} />}
//                                     >
//                                         <Card.Meta
//                                             description={
//                                                 <div>
//                                                     <span>￥{item.price}</span>
//                                                     <span style={{ float: "right" }}>
//                                                         <Icon type="user" /> {item.solded}
//                                                     </span>
//                                                 </div>
//                                             }
//                                         />
//                                         <div />
//                                     </Card>
//                                 ) : (
//                                         <Skeleton active={true} />
//                                     )}
//                             </Col>
//                         );
//                     })}
//                 </Row>
//             </div>
//         );
//     }
// }
// export default Goods;

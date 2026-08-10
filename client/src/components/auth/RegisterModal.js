import { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect  } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authAction';
import { clearErrors } from "../../actions/errorAction";

class RegisterModal extends Component{
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

   componentDidUpdate(prevProps) {
    console.log("isAuthenticated:", this.props.isAuthenticated);
    console.log("Previous:", prevProps.isAuthenticated);
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
        if (error.id === "REGISTER_FAIL") {
            this.setState({ msg: error.msg.msg });
        } else {
            this.setState({ msg: null });
        }
    }

    if (
        this.state.modal &&
        isAuthenticated &&
        isAuthenticated !== prevProps.isAuthenticated
    ) {
        this.toggle();
    }
}

    toggle = () => {
    console.log("Before:", this.state.modal);

    this.props.clearErrors();

    this.setState(
        {
            modal: !this.state.modal
        },
        () => {
            console.log("After:", this.state.modal);
        }
    );
};
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e =>{
        e.preventDefault();

        const { name, email, password } = this.state;

        //Create user objects
        const newUser = {
            name,
            email,
            password
        }
        //Attempt to register
        this.props.register(newUser);
    };

    render() {
        return (
            <div>
               <Button color="primary" onClick={this.toggle}>
                    Register
                </Button>
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                   type='text'
                                   name='name'
                                   id='name'
                                   placeholder='Name'
                                   className='mb-3'
                                   onChange={this.onChange}/>

                                <Label for="email">Email</Label>
                                 <Input
                                   type='email'
                                   name='email'
                                   id='email'
                                   placeholder='Email'
                                   className='mb-3'
                                   onChange={this.onChange}
                                  />

                                <Label for="password">Password</Label>
                                 <Input
                                   type='password'
                                   name='password'
                                   id='password'
                                   placeholder='Password'
                                    className='mb-3'
                                   onChange={this.onChange}/>
                                   <Button
                                   color="dark"
                                   style={{marginTop: '2rem'}}
                                   block>
                                    Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated,
   error: state.error
});

export default  connect(mapStateToProps, { register, clearErrors })
    (RegisterModal);
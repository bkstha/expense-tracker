import React from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addIncome, addIncomeTag, setSelectedTags } from '../../actions';
import Loading from "../html/Loading";
import Select from "../html/Select";
import Date from "../html/Date";
import TextGroup from "../html/TextGroup";
import Text from "../html/Text";
import CreatableSelect from 'react-select/creatable';


class IncomeForm extends React.Component {

    handleChange = (newValue, actionMeta) => {
        this.props.setSelectedTags(newValue);
        if (actionMeta.action === "create-option") {
            this.props.addIncomeTag(newValue[newValue.length - 1]);
        }
    };

    getAccountList() {
        return this.props.accountList.map(data => {
            data.value = data.id;
            data.label = data.name;
            return data;
        });
    }

    getSelectedTags() {
        const selectedTagsArray = [];
        this.props.selectedTags.forEach(tag => {
            selectedTagsArray.push({
                label: tag,
                value: tag
            })
        });
        return selectedTagsArray;
    }

    render() {
        return (
            <form name="incomeForm" onSubmit={this.props.handleSubmit(this.props.addIncome)}>
                <div className="row mb-3 mt-3">
                    <div className="col-9">
                        <Field component={Select} name="to" label="To" options={this.getAccountList()} required="true" />

                    </div>

                    <div className="col-3">
                        <div className="amount-margin-top">
                            <Field component={TextGroup} name="amount" groupLabel="NPR" />
                        </div>
                    </div>
                </div>

                <div className="row mb-3 mt-3">
                    <div className="col-9">
                        <label className="form-label">Tags</label>
                        <CreatableSelect
                            defaultValue={this.getSelectedTags()}
                            isMulti
                            onChange={this.handleChange}
                            options={this.props.tags}
                        />

                    </div>

                    <div className="col-3">
                        <div className="amount-margin-top">
                            <Field component={Date} name="date" required="true" />
                        </div>
                    </div>
                </div>
                <div className="row mb-3 mt-3">
                    <div className="col-9">
                        <Field component={Text} name="note" hasLabel={false} placeholder="Note" />
                    </div>

                    <div className="col-3">
                        <button type="submit" className="btn btn-primary btn-block" disabled={this.props.loading}> Save Income &nbsp; <Loading /></button>
                    </div>
                </div>
            </form>
        );
    }
}

//WTD create reusable method (code seems to have similar with expense form)
const validate = (formValues) => {
    const errors = {};
    if (!formValues.to || formValues.to === "0") {
        errors.from = "Enter From Account"
    }

    if (!formValues.amount) {
        errors.amount = "Enter amount."
    }

    if (formValues.amount) {
        try {
            const amount = Number(formValues.amount);
            if (Object.is(NaN, amount)) {
                errors.amount = "Enter Valid Amount"
            }
        } catch (e) {
            errors.amount = "Enter Valid Amount"
        }
    }
    if (!formValues.date) {
        errors.date = "Enter date."
    }
    return errors;
};

const mapStateToProps = state => {
    return {
        accountList: state.account.list,
        tags: state.transaction.incomeTags,
        selectedTags: state.transaction.selectedIncomeTags
    }
};

const connectIncomeForm = connect(mapStateToProps, { addIncome, addIncomeTag, setSelectedTags })(IncomeForm);
export default reduxForm({
    form: "incomeForm",
    validate,
    enableReinitialize: true
})(connectIncomeForm);
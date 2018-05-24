import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

import './global.css'

class AvailabilitySubscriber extends Component {
  state = {
    name: '',
    email: '',
    emailError: '',
    hasBlurredEmail: false,
  }

  static propTypes = {
    skuId: PropTypes.number.isRequired,
    intl: intlShape.isRequired,
  }

  validateEmail = () => {
    const { email, emailError } = this.state

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    let error = ''

    if (!emailRegex.test(email.toLowerCase())) {
      error = 'availability-subscriber.invalid-email'
    }

    if (error !== emailError) {
      return {
        emailError: error,
      }
    }

    return null
  }

  handleEmailBlur = () => {
    if (this.state.hasBlurredEmail) {
      return
    }

    this.setState({
      hasBlurredEmail: true,
    })
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })

    if (e.targer.name === 'email') {
      this.validateEmail()
    }
  }

  handleClick = () => {
    console.log('mutation')
  }

  translate = id => this.props.intl.formatMessage({ id })

  componentDidMount() {
    this.setState({
      email: this.emailInput.value || '',
      name: this.nameInput.value || '',
    })
  }

  render() {
    const { name, email, emailError, hasBlurredEmail } = this.state

    const isFormDisabled = name.length !== '' || email.length !== '' || emailError !== ''

    let emailErrorMessage = ''

    if (hasBlurredEmail && emailError !== '') {
      emailErrorMessage = this.translate(emailError)
    }

    return (
      <div className="vtex-availability-subscriber">
        <div className="vtex-availability-subcriber__title">
          {this.translate('availability-subscriber.title')}
        </div>
        <div className="vtex-availability-subscriber__subscribe-label">
          {this.translate('availability-subscriber.subscribe-label')}
        </div>
        <form>
          <Input
            name="name"
            type="text"
            placeholder={this.translate('availability-subscriber.name-placeholder')}
            value={name}
            onChange={this.handleInputChange}
            ref={e => { this.nameInput = e }}
          />
          <Input
            name="email"
            type="email"
            placeholder={this.translate('availability-subscriber.email-placeholder')}
            value={email}
            onChange={this.handleInputChange}
            onBlur={this.handleEmailBlur}
            error={hasBlurredEmail && !!emailError}
            errorMessage={emailErrorMessage}
            ref={e => { this.emailInput = e }}
          />
          <Button onClick={this.handleClick} primary disabled={isFormDisabled}>
            {this.translate('availability-subscriber.send-label')}
          </Button>
        </form>
      </div>
    )
  }
}

export default injectIntl(AvailabilitySubscriber)

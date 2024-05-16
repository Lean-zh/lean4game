import * as React from 'react'
import { useContext } from 'react'
import { PrivacyPolicyPopup } from './privacy_policy'
import { ImpressumPopup } from './impressum'
import { InfoPopup } from './game_info'
import { ErasePopup } from './erase'
import { PreferencesPopup } from './preferences'
import { UploadPopup } from './upload'

/** The context which manages if a popup is shown.
 * If `popupContent` is `null`, the popup is closed.
 */
export const PopupContext = React.createContext<{
  popupContent: string,
  setPopupContent: React.Dispatch<React.SetStateAction<string>>
}>({
  popupContent: null,
  setPopupContent: () => {}
})

/** To create a new Popup, one needs to add its content as `React.JSX.Element` here
 * and then call `setPopupConent(key)` at the place where to popup should be opened.
 *
 * TODO: The drawback of this design is that there is no check for key missmatches.
 *       How could that be achieved?
 */
export const Popups = {
  "erase": <ErasePopup />,
  "impressum": <ImpressumPopup />,
  "info": <InfoPopup />,
  "preferences": <PreferencesPopup />,
  "privacy": <PrivacyPolicyPopup />,
  "upload": <UploadPopup />,
}

/** The skeleton for the popups. */
export function Popup () {
  const {popupContent, setPopupContent} = useContext(PopupContext)
  function closePopup() {
    setPopupContent(null)
  }

  return <div className="modal-wrapper">
  <div className="modal-backdrop" onClick={closePopup} />
  <div className="modal">
    <div className="codicon codicon-close modal-close" onClick={closePopup}></div>
    {Popups[popupContent]}
  </div>
</div>
}
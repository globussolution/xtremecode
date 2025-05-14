import AppLayout from "../../../Admin Components/AppLayout";
import { useState } from "react";
import {
  Tabs,
  Input,
  Select,
  Checkbox,
  Button,
  Collapse,
  Divider,
  Row,
  Col,
} from "antd";
import { Link } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";
import {
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;
const { Option } = Select;

const initialVideoTrack = {
  bitrate: 700,
  bitrateUnit: "K",
  width: 320,
  height: 240,
  codec: "h264",
  bframes: "- Not selected -",
  sar: "1:1",
  resize: "- Not selected -",
  profile: "baseline",
  interface: "- Not selected -",
  preset: "- Not selected -",
  refs: "- Not selected -",
  level: "2.1",
  openGOP: false,
  logo: null,
  logoPosition: "- Not selected -",
  extendedKey: "",
  extendedValue: "",
  fps: "- Not selected -",
  deinterlace: "off",
  cropAfterDecoding: "",
  gopSize: "",
};

function Transcoder() {
  const [isMobile, setIsMobile] = useState(false);
  const [copyAudioFromInput, setCopyAudioFromInput] = useState(false);
  const [audioBitrate, setAudioBitrate] = useState(64);
  const [audioBitrateUnit, setAudioBitrateUnit] = useState("K");
  const [audioCodec, setAudioCodec] = useState("aac");
  const [audioSampleRate, setAudioSampleRate] = useState("48000");
  const [audioChannels, setAudioChannels] = useState("2");
  const [audioVolume, setAudioVolume] = useState("");
  const [splitChannels, setSplitChannels] = useState(false);

  const [copyVideoFromInput, setCopyVideoFromInput] = useState(false);
  const [videoTracks, setVideoTracks] = useState([initialVideoTrack]);
  const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState(false);
  const [pixelFormat, setPixelFormat] = useState("- Not selected -");
  const [improvePerformance, setImprovePerformance] = useState(false);

  const handleAddVideoTrack = () => {
    setVideoTracks([...videoTracks, { ...initialVideoTrack }]);
  };

  const handleRemoveVideoTrack = (index) => {
    const newTracks = [...videoTracks];
    newTracks.splice(index, 1);
    setVideoTracks(newTracks);
  };

  const handleDuplicateVideoTrack = (index) => {
    const newTracks = [...videoTracks, { ...videoTracks[index] }];
    setVideoTracks(newTracks);
  };

  const handleVideoTrackChange = (index, name, value) => {
    const newTracks = [...videoTracks];
    newTracks[index][name] = value;
    setVideoTracks(newTracks);
  };

  const handleSelectLogo = (index) => {
    // Implement your logo selection logic here, e.g., open a modal
    console.log(`Select logo for track ${index + 1}`);
  };

  const handleRemoveLogo = (index) => {
    const newTracks = [...videoTracks];
    newTracks[index].logo = null;
    setVideoTracks(newTracks);
  };

  const handleExtendedInputChange = (index, name, value) => {
    const newTracks = [...videoTracks];
    newTracks[index][name] = value;
    setVideoTracks(newTracks);
  };

  return (
    <AppLayout>
      {/* Tabs */}
      <div
        className={`scrollHide w-full overflow-x-auto flex items-center gap-2 border-b border-gray-200 ${
          isMobile ? "px-2" : "px-4"
        }`}
      >
        <Tabs
          defaultActiveKey="3"
          className="mb-0"
          size={isMobile ? "small" : "middle"}
        >
          <TabPane tab={<Link to="/media/overview">Overview</Link>} key="1" />
          <TabPane tab={<Link to="/media/input">Input</Link>} key="2" />
          <TabPane
            tab={<Link to="/media/transcoder">Transcoder</Link>}
            key="3"
          />
          <TabPane tab={<Link to="/media/dvr">DVR</Link>} key="4" />
          <TabPane tab={<Link to="/media/output">Output</Link>} key="5" />
          <TabPane tab={<Link to="/media/epg">EPG</Link>} key="6" />
          <TabPane tab={<Link to="/media/auth">Auth</Link>} key="7" />
          <TabPane
            tab={<Link to="/media/playsessions">Play sessions</Link>}
            key="8"
          />
        </Tabs>
      </div>

      <div className="p-4 h-[calc(100vh-150px)] overflow-y-auto">
        {/* Audio Configuration */}
        <div className="mb-8 border border-gray-300 p-4 rounded-md bg-white">
          <h2 className="text-xl font-semibold mb-4">Audio</h2>
          <Row gutter={16} align="middle" className="mb-2">
            <Col>
              <Checkbox
                checked={copyAudioFromInput}
                onChange={(e) => setCopyAudioFromInput(e.target.checked)}
              >
                Copy from input
              </Checkbox>
            </Col>
          </Row>
          <Row gutter={16} className="mb-2">
            <Col xs={24} sm={12} md={6}>
              <Input
                disabled={copyAudioFromInput}
                addonAfter={
                  <Select
                    defaultValue="K"
                    style={{ width: 60 }}
                    onChange={(value) => setAudioBitrateUnit(value)}
                  >
                    <Option value="K">K</Option>
                    <Option value="M">M</Option>
                  </Select>
                }
                type="number"
                value={audioBitrate}
                onChange={(e) => setAudioBitrate(e.target.value)}
                placeholder="Bitrate"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                disabled={copyAudioFromInput}
                value={audioCodec}
                style={{ width: "100%" }}
                onChange={(value) => setAudioCodec(value)}
                placeholder="Codec"
              >
                <Option value="aac">aac</Option>
                <Option value="opus">opus</Option>
                <Option value="mp2a">mp2a</Option>
                <Option value="ac3">ac3</Option>
                <Option value="pcma">pcma</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                disabled={copyAudioFromInput}
                value={audioSampleRate}
                style={{ width: "100%" }}
                onChange={(value) => setAudioSampleRate(value)}
                placeholder="Sample rate"
              >
                <Option value="bypass">bypass</Option>
                <Option value="8000">8000</Option>
                <Option value="16000">16000</Option>
                <Option value="24000">24000</Option>
                <Option value="32000">32000</Option>
                <Option value="44100">44100</Option>
                <Option value="48000">48000</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                disabled={copyAudioFromInput}
                value={audioChannels}
                style={{ width: "100%" }}
                onChange={(value) => setAudioChannels(value)}
                placeholder="Channels"
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="8">8</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={16} align="middle">
            <Col xs={24} sm={12} md={6}>
              <Input
                disabled={copyAudioFromInput}
                value={audioVolume}
                onChange={(e) => setAudioVolume(e.target.value)}
                placeholder="Volume"
              />
            </Col>
            <Col>
              <Checkbox
                disabled={copyAudioFromInput}
                checked={splitChannels}
                onChange={(e) => setSplitChannels(e.target.checked)}
              >
                Split channels
              </Checkbox>
            </Col>
          </Row>
        </div>

        {/* Video Configuration */}
        <div className="mb-8 border border-gray-300 p-4 rounded-md bg-white">
          <h2 className="text-xl font-semibold mb-4">Video</h2>
          <Row gutter={16} align="middle" className="mb-2">
            <Col>
              <Checkbox
                checked={copyVideoFromInput}
                onChange={(e) => setCopyVideoFromInput(e.target.checked)}
              >
                Copy from input
              </Checkbox>
            </Col>
            <Col>
              <button
                className="cursor-pointer transition-all bg-[#08009b] border border-[#08009b] text-white hover:text-[#08009b] hover:bg-white font-semibold px-3 py-1.5 rounded-md"
                onClick={handleAddVideoTrack}
              >
                Add Video Track <PlusOutlined />
              </button>
            </Col>
          </Row>

          {videoTracks.map((track, index) => (
            <div key={index} className="mb-4 p-3 rounded-md bg-gray-50">
              <Row gutter={16}  style={{marginBottom: '25px'}}>
                <Col xs={24} sm={12} md={3}>
                  <Select
                    disabled={copyVideoFromInput}
                    value={track.fps}
                    style={{ width: "100%" }}
                  >
                    <Option value="- Not selected -">- Not selected -</Option>
                    <Option value="CPU Encoder (0)">CPU Encoder (0)</Option>
                  </Select>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Select
                    placeholder="Deinterlace"
                    disabled={copyVideoFromInput}
                    value={track.deinterlace}
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      handleVideoTrackChange(index, "deinterlace", value)
                    }
                  >
                    <Option value="off">off</Option>
                    <Option value="on">on</Option>
                  </Select>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Input
                    placeholder="Crop after decoding (e.g., 0:0:720:576)"
                    disabled={copyVideoFromInput}
                    value={track.cropAfterDecoding}
                    onChange={(e) =>
                      handleVideoTrackChange(
                        index,
                        "cropAfterDecoding",
                        e.target.value
                      )
                    }
                  />
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Input
                    placeholder="GOP size"
                    type="number"
                    disabled={copyVideoFromInput}
                    value={track.gopSize}
                    onChange={(e) =>
                      handleVideoTrackChange(index, "gopSize", e.target.value)
                    }
                  />
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Select
                    placeholder="FPS"
                    disabled={copyVideoFromInput}
                    value={track.fps}
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      handleVideoTrackChange(index, "fps", value)
                    }
                  >
                    <Option value="- Not selected -">- Not selected -</Option>
                    <Option value="24">24</Option>
                    <Option value="25">25</Option>
                    <Option value="30">30</Option>
                    <Option value="50">50</Option>
                    <Option value="60">60</Option>
                  </Select>
                </Col>
              </Row>

              <Collapse
                style={{marginBottom: '25px'}}
                activeKey={advancedOptionsOpen ? ["1"] : []}
                onChange={() => setAdvancedOptionsOpen(!advancedOptionsOpen)}
              >
                <Panel header="Advanced options" key="1">
                  <Row gutter={16} align="middle">
                    <Col xs={24} sm={12} md={6}>
                      <Select
                        value={pixelFormat}
                        style={{ width: "100%" }}
                        onChange={(value) => setPixelFormat(value)}
                        placeholder="Pixel format"
                      >
                        <Option value="- Not selected -">
                          - Not selected -
                        </Option>
                        {/* Add pixel format options */}
                      </Select>
                    </Col>
                    <Col>
                      <Checkbox
                        checked={improvePerformance}
                        onChange={(e) =>
                          setImprovePerformance(e.target.checked)
                        }
                      >
                        Improve the transcoder performance by running it as part
                        of Flussonic Media Server (use with caution)
                      </Checkbox>
                    </Col>
                  </Row>
                </Panel>
              </Collapse>

              <div className="flex justify-end gap-2">
                <Button onClick={() => handleDuplicateVideoTrack(index)}>
                  Duplicate
                </Button>
                {videoTracks.length > 1 && (
                  <Button
                    danger
                    icon={<MinusCircleOutlined />}
                    onClick={() => handleRemoveVideoTrack(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <h3 className="font-semibold mt-5">Track {index + 1}</h3>
              <Row gutter={16} className="mb-2">
                <Col xs={24} sm={12} md={3}>
                  <Input
                    disabled={copyVideoFromInput}
                    addonAfter={
                      <Select
                        defaultValue="K"
                        style={{ width: 60 }}
                        onChange={(value) =>
                          handleVideoTrackChange(index, "bitrateUnit", value)
                        }
                      >
                        <Option value="K">K</Option>
                        <Option value="M">M</Option>
                      </Select>
                    }
                    type="number"
                    value={track.bitrate}
                    onChange={(e) =>
                      handleVideoTrackChange(index, "bitrate", e.target.value)
                    }
                    placeholder="Bitrate"
                  />
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Input
                    disabled={copyVideoFromInput}
                    type="number"
                    value={track.width}
                    onChange={(e) =>
                      handleVideoTrackChange(index, "width", e.target.value)
                    }
                    placeholder="Width"
                  />
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Input
                    disabled={copyVideoFromInput}
                    type="number"
                    value={track.height}
                    onChange={(e) =>
                      handleVideoTrackChange(index, "height", e.target.value)
                    }
                    placeholder="Height"
                  />
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Select
                    disabled={copyVideoFromInput}
                    value={track.codec}
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      handleVideoTrackChange(index, "codec", value)
                    }
                    placeholder="Codec"
                  >
                    <Option value="h264">h264</Option>
                    {/* Add other codec options */}
                  </Select>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Select
                    disabled={copyVideoFromInput}
                    value={track.bframes}
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      handleVideoTrackChange(index, "bframes", value)
                    }
                    placeholder="Bframes"
                  >
                    <Option value="- Not selected -">- Not selected -</Option>
                    {/* Add other bframes options */}
                  </Select>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Select
                    disabled={copyVideoFromInput}
                    value={track.sar}
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      handleVideoTrackChange(index, "sar", value)
                    }
                    placeholder="SAR"
                  >
                    <Option value="1:1">1:1</Option>
                    {/* Add other SAR options */}
                  </Select>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Select
                    disabled={copyVideoFromInput}
                    value={track.resize}
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      handleVideoTrackChange(index, "resize", value)
                    }
                    placeholder="Resize"
                  >
                    <Option value="- Not selected -">- Not selected -</Option>
                    {/* Add other resize options */}
                  </Select>
                </Col>
              </Row>
              <Row gutter={16} className="mb-2">
                <Col xs={24} sm={12} md={3}>
                  <Select
                    disabled={copyVideoFromInput}
                    value={track.profile}
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      handleVideoTrackChange(index, "profile", value)
                    }
                    placeholder="Profile"
                  >
                    <Option value="baseline">baseline</Option>
                    {/* Add other profile options */}
                  </Select>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Select
                    disabled={copyVideoFromInput}
                    value={track.interface}
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      handleVideoTrackChange(index, "interface", value)
                    }
                    placeholder="Interface"
                  >
                    <Option value="- Not selected -">- Not selected -</Option>
                    {/* Add other interface options */}
                  </Select>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Select
                    disabled={copyVideoFromInput}
                    value={track.preset}
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      handleVideoTrackChange(index, "preset", value)
                    }
                    placeholder="Preset"
                  >
                    <Option value="- Not selected -">- Not selected -</Option>
                    {/* Add other preset options */}
                  </Select>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Select
                    disabled={copyVideoFromInput}
                    value={track.refs}
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      handleVideoTrackChange(index, "refs", value)
                    }
                    placeholder="Refs"
                  >
                    <Option value="- Not selected -">- Not selected -</Option>
                    {/* Add other refs options */}
                  </Select>
                </Col>
                <Col xs={24} sm={12} md={3}>
                  <Input
                    disabled={copyVideoFromInput}
                    value={track.level}
                    onChange={(e) =>
                      handleVideoTrackChange(index, "level", e.target.value)
                    }
                    placeholder="Level"
                  />
                </Col>
                <Col xs={24} sm={12} md={3} className="flex items-center">
                  <Checkbox
                    disabled={copyVideoFromInput}
                    checked={track.openGOP}
                    onChange={(e) =>
                      handleVideoTrackChange(index, "openGOP", e.target.checked)
                    }
                  >
                    Open GOP
                  </Checkbox>
                </Col>
              </Row>

              <Divider />

              <Row gutter={16} align="middle" className="mb-5">
                <Col xs={24} sm={12} md={6}>
                  <button className="cursor-pointer transition-all bg-[#08009b] border border-[#08009b] text-white hover:text-[#08009b] hover:bg-white font-semibold px-3 py-1.5 rounded-md" onClick={() => handleSelectLogo(index)}>
                    {track.logo ? "Change Logo" : "Select Logo"}
                  </button>
                  {track.logo && (
                    <span className="ml-2">{track.logo.name}</span>
                  )}
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Select
                    placeholder="Position"
                    disabled={copyVideoFromInput}
                    value={track.logoPosition}
                    onChange={(value) =>
                      handleVideoTrackChange(index, "logoPosition", value)
                    }
                    style={{ width: "100%" }}
                  >
                    <Option value="- Not selected -">- Not selected -</Option>
                    {/* Add logo position options */}
                  </Select>
                </Col>
                {track.logo && (
                  <Col xs={24} sm={12} md={6}>
                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleRemoveLogo(index)}
                    >
                      Remove Logo
                    </Button>
                  </Col>
                )}
              </Row>

              <Collapse>
                <Panel header="Extended" key="1">
                  <Row gutter={16} className="mb-2">
                    <Col xs={24} sm={12} md={8}>
                      <Input
                        placeholder="New key"
                        disabled={copyVideoFromInput}
                        value={track.extendedKey}
                        onChange={(e) =>
                          handleExtendedInputChange(
                            index,
                            "extendedKey",
                            e.target.value
                          )
                        }
                      />
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Input
                        placeholder="New value"
                        disabled={copyVideoFromInput}
                        value={track.extendedValue}
                        onChange={(e) =>
                          handleExtendedInputChange(
                            index,
                            "extendedValue",
                            e.target.value
                          )
                        }
                      />
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </div>
          ))}
        </div>

        <Divider />

        <div className="flex justify-end gap-2">
          <Button>Disable Transcoder</Button>
          <Button>Copy Settings</Button>
          <Button danger>Delete Stream</Button>
          <Button type="primary">Save</Button>
        </div>
      </div>
    </AppLayout>
  );
}

export default Transcoder;
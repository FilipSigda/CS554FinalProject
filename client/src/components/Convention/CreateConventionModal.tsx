import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose
} from '../ui/dialog';
import { Input } from '../ui/input.tsx';
import { Button } from '../ui/button.tsx';
import { Textarea } from '../ui/textarea.tsx';
import { Label } from '../ui/label.tsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createConvention } from '../../api/conventions';
import { useContext } from 'react';
import userContext from '../../context/userContext';

interface CreateConventionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateConventionModal: React.FC<CreateConventionModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [address, setAddress] = useState('');
  const [exclusive, setExclusive] = useState(false);
  const [description, setDescription] = useState('');
  const { user } = useContext(userContext);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSubmit = async () => {
    if (!user?._id) {
      alert('Missing id');
      return;
    }
    if (!name) {
      alert('Missing name');
      return;
    }
    if (!startDate) {
      alert('Missing startDate');
      return;
    }
    if (!endDate) {
      alert('Missing endDate');
      return;
    }
    if (!isOnline && !address) {
      alert('Missing isOnline && !address');
      return;
    }
    if (tags.length === 0) {
      if (tagInput.trim()) {
        tags.push(tagInput.trim());
      } else {
        alert('Missing tags');
        return;
      }
    }


    // if (!name || !startDate || !endDate || (!isOnline && !address) || tags.length === 0) {
    //   alert('Missing required fields');
    //   return;
    // }
    const formData = {
      name,
      tags,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      isOnline,
      address,
      exclusive,
      description,
      ownerIds: [user?._id]
    };

    try {
      await createConvention(formData);
      onSuccess();
      onClose();
    } catch (e) {
      alert(e?.response?.data?.error || 'Failed to save convention');
      console.error('Failed to create convention', e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogClose onClick={onClose} />
      <DialogTitle>Create Convention</DialogTitle>

      <DialogContent>
        <div className="formGroup">
          <Label className="label">Convention Name</Label>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. NYC Anime ONLY"
          />
        </div>

        <div className="formGroup">
          <Label>Start Date – End Date</Label>
          <div className="radioGroup">
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              showTimeSelect
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              showTimeSelect
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              placeholderText="End Date"
            />
          </div>
        </div>

        <div className="formGroup">
          <Label>Is the convention online?</Label>
          <div className="radioGroup">
            <label>
              <input
                type="radio"
                checked={!isOnline}
                onChange={() => setIsOnline(false)}
              />{' '}
              Offline
            </label>
            <label>
              <input
                type="radio"
                checked={isOnline}
                onChange={() => setIsOnline(true)}
              />{' '}
              Online
            </label>
          </div>
        </div>

        {!isOnline && (
          <div className="formGroup">
            <Label>Location</Label>
            <Input
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Detailed address"
            />
          </div>
        )}

        <div className="formGroup">
          <Label>Tags</Label>
          <Input
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add tag, press Enter"
          />
          <div className="tagList">
            {tags.map((tag, idx) => (
              <span key={idx} className="tag">
                #{tag}
                <button
                  type="button"
                  aria-label={`Remove tag ${tag}`}
                  className="tagButton"
                  onClick={() => setTags(tags.filter((_, i) => i !== idx))}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="formGroup">
          <Label>Description</Label>
          <Textarea
            className="textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="10-300 characters"
          />
        </div>

        <div className="formGroup">
          <Label>Exclusive</Label>
          <div className="radioGroup">
            <label>
              <input
                type="radio"
                checked={exclusive}
                onChange={() => setExclusive(true)}
              />{' '}
              Yes
            </label>
            <label>
              <input
                type="radio"
                checked={!exclusive}
                onChange={() => setExclusive(false)}
              />{' '}
              No
            </label>
          </div>
        </div>
      </DialogContent>

      <DialogFooter>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={onClose}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CreateConventionModal;
